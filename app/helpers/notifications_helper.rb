module NotificationsHelper
  def get_notifications
    activities = PublicActivity::Activity.all

    @parsed_notifications = []

    activities.each do |activity|
      object = activity.trackable_type.constantize
      object_id = activity.trackable_id

      object = object.where('id = ?', object_id.to_i).first

      if (!object)
        return
      end

      object_owner = object.try(:user)

      object_type = "post"

      # if the activity object owner
      # is not the current user
      # then skip to next activity
      if (object_owner.id.to_i != current_user.id)
        next
      end

      activity_owner = User.find(activity.owner_id)

      if activity.trackable_type == "Like" or activity.trackable_type == "Comment"
        post_id = object.find(object_id.to_i).post_id
        object_owner = Post.find(post_id).user
      end

      if (object_owner.id == activity.owner_id)
        next
      end

      @parsed_notifications << {
        :object_owner => object_owner,
        :activity_owner => activity_owner,
        :object_type => object_type,
        :message => I18n.t("activity.#{activity.key}")
      }
    end
  end
end
