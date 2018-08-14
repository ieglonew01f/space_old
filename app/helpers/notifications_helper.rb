module NotificationsHelper
  def get_notifs
    activities = PublicActivity::Activity.where('owner_id != ?', current_user.id)
    parsed_activities = []

    activities.each do |activity|
      activity_object_class = activity.trackable_type.constantize
      activity_object_id = activity.trackable_id
      activity_object = activity_object_class.where('id = ?', activity_object_id.to_i).first
      activity_owner = User.find(activity.owner_id)

      if (activity_object.nil?)
        next
      end

      # if activity is a like or a comment then find out the real
      # target object which is a post
      if (activity.trackable_type == "Like" or activity.trackable_type == "Comment")
        post = Post.find(activity_object.try(:post_id))
        activity_object_owner = post.try(:user)
        activity_post_id = post.id
      else
        activity_post_id = activity_object.id
        activity_object_owner = activity_object.try(:user)
      end

      if (activity_object_owner.nil?)
        next
      end

      # if all good then parse activities
      parsed_activities << {
        :object_owner => activity_object_owner,
        :activity_owner => activity_owner,
        :object_type => "post",
        :object_id => activity_post_id.to_i,
        :message => I18n.t("activity.#{activity.key}"),
        :timestamp => time_ago_in_words(activity.created_at) + " ago"
      }
    end

    return parsed_activities
  end
end
