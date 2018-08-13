$(document).ready(function() {
  //events
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
              object_id: n.object_id
            }));
        });

        $('.top-notification-list').html(notifications_html.join(''));
      }
    });
  })();
});
