$(document).ready(function() {
  //globals
  const AUTH_TOKEN = $('meta[name=csrf-token]').attr('content');
  var chat_incoming_template = Handlebars.compile($('#chat-incoming').html());
  var chat_outgoing_template = Handlebars.compile($('#chat-outgoing').html());

  //init websocket
  init_web_socket_connections();

  //Load all chat users on the right sidebar
  load_online_users();

  //Event listeners
  //when user clicks on a person to chat
  //make an api call to fetch previous messages
  //and open the chat dialog

  $('.fixed-sidebar.right').on('click', '.open-chat', function() {
    var user_id = $(this).attr('data-user-id'),
        name = $(this).attr('data-name'),
        chat_state = $(this).attr('data-chat-state');

    //open chat window
    open_chat_window(user_id, name, null, chat_state);
    //and load all messages
    load_messages(user_id);
  });

  //on keypress enter send message
  $('.fixed-sidebar.right').on('keyup', '.text-chat-message', function(e) {
    var chat_id = $(this).parents('.popup-chat-responsive').attr('data-chat-id');
    var for_id = $(this).parents('.popup-chat-responsive').attr('data-user-id');

    //send is typing
    if ($(this).val() == '') {
        App.messages.is_typing(chat_id, for_id, false);
    }
    else if ($(this).val() != '') {
        App.messages.is_typing(chat_id, for_id, true);
    }

    //send message
    if (e.which == 13) {
        var message = $(this).val();
        if (!message) return;

        send_message(message, chat_id, for_id);

        //cleanup
        $(this).val('');
    }
  });

  //close chat window
  $(document).on('click', '.close-chat', function(){
    $(this).parents('.ui-block.popup-chat.popup-chat-responsive').remove();
  });

  function open_chat_window(user_id, name, chat_id, chat_state) {
    var source = $('#chat-pop-up').html(),
        chat_window_template = Handlebars.compile(source);

    //check if chat window already exist
    if ($('.popup-chat-responsive[data-user-id="'+user_id+'"]').length != 0) return;

    var right = 310 * parseInt($('.popup-chat-responsive').length);

    $('.fixed-sidebar.right').append(chat_window_template({
      name: name,
      user_id: user_id,
      chat_id: chat_id,
      right: right,
      chat_state: chat_state
    }));

    $('.popup-chat-responsive').draggable();

    //reset seen messages count
    $('.open-chat[data-user-id="'+user_id+'"]')
      .find('.label-avatar.bg-blue')
      .hide();
  };

  function load_online_users() {
    $.ajax({
      url: "/users/get_friends",
      cache: false,
      success: function(response) {
          var online_users_template_sm = Handlebars.compile($('#chat-user-template').html()),
            online_users_template_lg = Handlebars.compile($('#chat-user-template-lg').html()),
            users = response.data;

          var online_users = [],
              online_users_detail = [];

          $.each(users, function(i, user) {
            online_users.push(
              online_users_template_sm({
                profile_picture: user.details.profile_picture.thumb.url,
                user_id: user.details.id,
                name: user.details.first_name + ' ' + user.details.last_name,
                chat_state: user.details.chat_state || "disconected",
                unread_count: user.unread_count
              })
            );
            online_users_detail.push(
              online_users_template_lg({
                profile_picture: user.details.profile_picture.thumb.url,
                user_id: user.details.id,
                name: user.details.first_name + ' ' + user.details.last_name,
                chat_state: user.details.chat_state || "disconected",
                username: user.details.username,
                unread_count: user.unread_count
              })
            )
          });

          $('#ul-chat-users-small').html(online_users.join(''));
          $('#ul-chat-users-lg').html(online_users_detail.join(''));
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

        $('.popup-chat-responsive[data-user-id="'+user.id+'"]').attr('data-chat-id', chat.id);

        render_messages(messages, chat.id, user.profile_picture.thumb.url);
      }
    });
  }

  function render_messages(messages, chat_id, profile_picture) {
    if (!messages || messages.length === 0) return;

    var messages_html = [];

    $.each(messages, function(i, m) {
      var template = chat_incoming_template,
          this_profile_picture = profile_picture;


      //outgoing message
      //if message user is not current_user
      if (parseInt(gon.id, 10) === parseInt(m.user_id, 10)) {
        template = chat_outgoing_template,
        this_profile_picture = gon.profile_picture.thumb.url;
      }

      messages_html.push(
        template({
          message: m.content,
          profile_picture: this_profile_picture
        })
      )
    });

    $('.popup-chat-responsive[data-chat-id="' + chat_id + '"]')
      .find('ul.notification-list.chat-message')
      .html(messages_html.join(''));

    scroll_chat(chat_id);
  };

  function send_message(message, chat_id, for_id) {
    $.ajax({
      url: "/messages",
      cache: false,
      type: "POST",
      data: {
        authenticity_token: AUTH_TOKEN,
        content: message,
        chat_id: chat_id,
        for_id: for_id
      },
      beforeSend: function() {
        $('.popup-chat-responsive[data-chat-id="' + chat_id + '"]')
          .find('ul.notification-list.chat-message')
          .append(
            chat_outgoing_template({
              message: message,
              profile_picture: gon.profile_picture.thumb.url
            })
          );

        scroll_chat(chat_id);
      },
      success: function(response) {

      }
    });
  };

  function scroll_chat(chat_id) {
    var elem = $('.popup-chat-responsive[data-chat-id="' + chat_id + '"]').find('ul.notification-list.chat-message');
    elem.scrollTop(elem[0].scrollHeight);
  }

  function init_web_socket_connections() {
    //open websocket subscription
    App.messages = App.cable.subscriptions.create({
      channel: 'MessagesChannel',
      for_user_id: parseInt(gon.id)
    },{
      is_typing: function (chat_id, for_id, is_typing) {
          return this.perform('is_typing', {
              chat_id: chat_id,
              for_id: for_id,
              is_typing: is_typing
          });
      },
      received: function(data) {
        switch (data.action) {
          case "set_chat_state":
            $('.open-chat[data-user-id="'+data.user_id+'"]')
              .find('.icon-status')
              .attr('class', 'icon-status ' + data.chat_state)

            if (window.current_user.id == data.user_id) {
              $('#site-header .icon-chat-state.icon-status')
                .attr('class', 'icon-chat-state icon-status ' + data.chat_state)
            }
            break;
          case "recieve_message":
            //do not render if current_user is the sender
            if (parseInt(gon.id) === parseInt(data.by_id)) return;

            var chat_window = $('.popup-chat-responsive[data-chat-id="' + data.chat_id + '"]');

            //check if chat window is already open
            if (chat_window.length === 0) {
              open_chat_window(data.by_id, data.name, data.chat_id, data.chat_state);
              append_incomming_message(data.chat_id, data.message, data.profile_picture);
            }
            else {
              append_incomming_message(data.chat_id, data.message, data.profile_picture);
            }
            $.playSound('https://s3.ap-south-1.amazonaws.com/collegetrends/sounds/pop.mp3');
            set_is_typing(data.chat_id, false);
            break;
          case "is_typing":
            set_is_typing(data.chat_id, data.is_typing)
            break;
          default:

        }
      }
    });
  }

  function set_is_typing(chat_id, is_typing) {
    var chat_window = $('.popup-chat-responsive[data-chat-id="' + chat_id + '"]');

    if (is_typing) {
      chat_window.find('.is-typing').show();
    }
    else {
      chat_window.find('.is-typing').hide();
    }

    //set timeout
    //hide after few seconds anyway
    setTimeout(function(){
      chat_window.find('.is-typing').hide();
    }, 5000)
  };

  function append_incomming_message(chat_id, message, profile_picture) {
    $('.popup-chat-responsive[data-chat-id="' + chat_id + '"]')
      .find('ul.notification-list.chat-message')
      .append(
        chat_incoming_template({
          message: message,
          profile_picture: profile_picture
        })
      );

    scroll_chat(chat_id);
  }
});
