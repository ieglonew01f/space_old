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
});
