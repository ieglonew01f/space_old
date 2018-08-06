$(document).ready(function() {
  //globals
  const AUTH_TOKEN = $('meta[name=csrf-token]').attr('content');
  var chat_incoming_template = Handlebars.compile($('#chat-incoming').html());
  var chat_outgoing_template = Handlebars.compile($('#chat-outgoing').html());

  //Load all chat users on the right sidebar
  load_online_users();

  //Event listeners
  //when user clicks on a person to chat
  //make an api call to fetch previous messages
  //and open the chat dialog

  $('#sidebar-right').on('click', '.open-chat', function() {
    var user_id = $(this).attr('data-user-id'),
        name = $(this).attr('data-name');

    //open chat window
    open_chat_window(user_id, name);
    //and load all messages
    load_messages(user_id);
  });

  //on keypress enter send message
  $('.fixed-sidebar.right').on('keyup', '.text-chat-message', function(e) {
    if(e.which == 13) {
        var message = $(this).val();
        if (!message) return;

        var chat_id = $(this).parents('.popup-chat-responsive').attr('data-chat-id');

        send_message(message, chat_id);

        //cleanup
        $(this).val('');
    }
  });

  //close chat window
  $(document).on('click', '.close-chat', function(){
    $(this).parents('.ui-block.popup-chat.popup-chat-responsive').remove();
  });

  function open_chat_window(user_id, name) {
    var source = $('#chat-pop-up').html(),
        chat_window_template = Handlebars.compile(source);

    $('.fixed-sidebar.right').append(chat_window_template({
      name: name,
      user_id: user_id
    }));
  };

  function load_online_users() {
    $.ajax({
      url: "/users/get_friends",
      cache: false,
      success: function(response) {
        var source   = $('#chat-user-template').html(),
            online_users_template = Handlebars.compile(source),
            users = response.data;

          var online_users = [];

          $.each(users, function(i, user) {
            online_users.push(
              online_users_template({
                profile_picture: user.profile_picture.thumb.url,
                user_id: user.id,
                name: user.first_name + ' ' + user.last_name
              })
            )
          });

          $('.chat-users').html(online_users.join(''));
      }
    });
  };

  function load_messages(user_id) {
    $.ajax({
      url: "/users/" + user_id + "/chats",
      cache: false,
      type: "POST",
      data: {
        authenticity_token: AUTH_TOKEN
      },
      success: function(response) {
        var chat = response.data.chat,
            user = response.data.user,
            messages = response.data.messages;

        $('.popup-chat-responsive').attr('data-chat-id', chat.id);

        render_messages(messages, chat.id);

        //open websocket subscription
        App.messages = App.cable.subscriptions.create({
          channel: 'MessagesChannel',
          chat_id: parseInt(chat.id)
        },{
          received: function(data) {
            console.log(data)
            //do not render if current_user is the sender
            if (parseInt(gon.id) === parseInt(data.by_id)) return;

            $('.popup-chat-responsive[data-chat-id="' + chat.id + '"]')
              .find('ul.notification-list.chat-message')
              .append(
                chat_incoming_template({
                  message: data.message
                })
              );

            scroll_chat();
          }
        });
      }
    });
  }

  function render_messages(messages, chat_id) {
    if (!messages || messages.length === 0) return;

    var messages_html = [];

    $.each(messages, function(i, m) {
      //incomming message
      //if message user is not current_user
      if (parseInt(gon.id, 10) === parseInt(m.user_id, 10)) {
        messages_html.push(
          chat_outgoing_template({
            message: m.content
          })
        )
      }
      else {
        messages_html.push(
          chat_incoming_template({
            message: m.content
          })
        )
      }
    });

    $('.popup-chat-responsive[data-chat-id="' + chat_id + '"]')
      .find('ul.notification-list.chat-message')
      .html(messages_html.join(''));

    scroll_chat();
  };

  function send_message(message, chat_id) {
    $.ajax({
      url: "/messages",
      cache: false,
      type: "POST",
      data: {
        authenticity_token: AUTH_TOKEN,
        content: message,
        chat_id: chat_id
      },
      beforeSend: function() {
        $('.popup-chat-responsive[data-chat-id="' + chat_id + '"]')
          .find('ul.notification-list.chat-message')
          .append(
            chat_outgoing_template({
              message: message
            })
          );

        scroll_chat();
      },
      success: function(response) {

      }
    });
  };

  function scroll_chat() {
    var elem = $('.popup-chat-responsive').find('ul.notification-list.chat-message');
    elem.scrollTop(elem[0].scrollHeight);
  }
});
