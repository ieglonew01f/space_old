//globals
$(document).ready(function() {
  //helpers
  String.prototype.trimToLength = function(m) {
    return (this.length > m)
      ? jQuery.trim(this).substring(0, m).split(" ").slice(0, -1).join(" ") + " ... "
      : this;
  };

  //events
  //follow user
  $(document).on('click', '.follow-user', function() {
      var user_id = $(this).attr('data-user-id'),
          user = $(this).attr('data-user'),
          self = $(this);

      $.ajax({
        url: "/users/" + user_id + "/follow",
        cache: false,
        type: "POST",
        success: function(response) {
          self
            .removeClass('follow-user')
            .removeClass('un-follow-user')
            .addClass('un-follow-user')
            .attr('data-original-title', 'Un Follow ' + user);

          self.html(
            '<svg class="olymp-happy-faces-icon">' +
              '<use xlink:href="/svg-icons/sprites/icons.svg#olymp-happy-faces-icon"></use>' +
            '</svg>'
          );
        }
      });
  });

  //unfollow user
  $(document).on('click', '.un-follow-user', function() {
      var user_id = $(this).attr('data-user-id'),
          user = $(this).attr('data-user'),
          self = $(this);

      $.ajax({
        url: "/users/" + user_id + "/follow",
        cache: false,
        type: "DELETE",
        success: function(response) {
          self
            .removeClass('follow-user')
            .removeClass('un-follow-user')
            .addClass('follow-user')
            .attr('data-original-title', 'Follow ' + user);

          self.html(
            '<svg class="olymp-plus-icon">' +
              '<use xlink:href="/svg-icons/sprites/icons.svg#olymp-plus-icon"></use>' +
            '</svg>'
          );
        }
      });
  });

  //fetch notification
  (function fetchNotifications() {
    $.ajax({
      url: "/notifications/get_notifications",
      cache: false,
      success: function(response) {
        var notifications = response.data;

        var template = Handlebars.compile($('#notification-template').html()),
            notifications_html = [];


        $.each(notifications, function(i, n) {
            notifications_html.push(template({
              activity_owner_name: n.activity_owner.first_name + " " + n.activity_owner.last_name,
              activity_owner_picture: n.activity_owner.profile_picture.thumb.url,
              activity_owner_username: n.activity_owner.username,
              message: n.message,
              object_id: n.object_id,
              timestamp: n.timestamp
            }));
        });

        $('.top-notification-list').html(notifications_html.join(''));
      }
    });
  })();

  //set user status
  $('.add-status').on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();

      var status = $('.status-input').val();

      $('.ui-user-status').text(status);

      $.ajax({
        url: "/users/set_status",
        cache: false,
        type: "POST",
        data: {
          status: status
        },
        success: function(response) {

        }
      });
  });

  $('.set-chat-state').on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();

      var chat_state = $(this).attr('data-state');

      $.ajax({
        url: "/users/set_chat_state",
        cache: false,
        type: "POST",
        data: {
          chat_state: chat_state
        },
        success: function(response) {
          $('.icon-chat-state').attr('class', 'icon-status icon-chat-state ' + chat_state);
        }
      });
  });

  //dedicate a song
  //paste link
  $('.paste-song-dedication-link').on('paste', function() {
    setTimeout(function() {
      var post_link = $('.paste-song-dedication-link').val();

      $.ajax({
        url: "/posts/parseLink",
        cache: false,
        type: "POST",
        data: {
          post_link: post_link
        },
        success: function(response) {
          var songDedicationTemplate = Handlebars.compile($('#song-dedication-template').html()),
              link = response.data;

              $('.parsed-link-storage').val(JSON.stringify(link));

          $('#song-dedication-modal .preview').html(
            songDedicationTemplate({
              image: link.best_image,
              description: link.description,
              url: link.url,
              title: link.title
            })
          );
        }
      });
    }, 100);
  });

  //dedicate song link
  $('#song-dedication-modal .dedicate').on('click', function() {
    var content = $('.paste-song-message').val(),
        meta = $('.parsed-link-storage').val();

    $.ajax({
      url: "/users/" + gon.id + "/dedications",
      cache: false,
      type: "POST",
      data: {
        content: content,
        link_meta: meta
      },
      success: function(response) {
        $('#song-dedication-modal .success-message').show();
        $('#song-dedication-modal .actions').hide();
        $('#song-dedication-modal .dedicate').hide();
        $('.paste-song-dedication-link').val('');
        $('#song-dedication-modal .preview').html('');
        $('#song-dedication-modal .paste-song-message').val('');
      }
    });
  });

  //dedicate model on hidden
  $('#song-dedication-modal').on('hidden.bs.modal', function () {
    $('#song-dedication-modal .success-message').hide();
    $('#song-dedication-modal .actions').show();
    $('#song-dedication-modal .dedicate').show();
  });

  //confession model on hidden
  $('#confession-modal').on('hidden.bs.modal', function () {
    $('#confession-modal .success-message').hide();
    $('#confession-modal .actions').show();
    $('#confession-modal .confess').show();
  });

  //share confession
  $('#confession-modal .confess').on('click', function() {
    var message = $('#confession-modal .message').val();

    $.ajax({
      url: "/users/" + gon.id + "/confessions",
      cache: false,
      type: "POST",
      data: {
        message: message
      },
      success: function(response) {
        $('#confession-modal .success-message').show();
        $('#confession-modal .actions').hide();
        $('#confession-modal .confess').hide();
      }
    });
  });
});
