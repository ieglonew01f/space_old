class NotificationsController < ApplicationController
  def get_activities
    activities = PublicActivity::Activity.all

    parsed_activities = []

    activities.each do |activity|
      object = activity.trackable_type.constantize
      object_id = activity.trackable_id

      object = object.where('id = ?', object_id.to_i).first

      if (!object)
        success_json(200, "Success", parsed_activities)
        return
      end

      object_owner = object.try(:user)
      object_type = "post"

      activity_owner = User.find(activity.owner_id)

      if activity.trackable_type == "Like" or activity.trackable_type == "Comment"
        post_id = object.find(object_id.to_i).post_id
        object_owner = Post.find(post_id).user
      end

      if (object_owner.id == activity.owner_id)
        next
      end

      parsed_activities << {
        :object_owner => object_owner,
        :activity_owner => activity_owner,
        :object_type => object_type,
        :object_id => post_id.to_i,
        :message => I18n.t("activity.#{activity.key}")
      }
    end

    if activities
      success_json(200, "Success", parsed_activities)
    else
      error_json(422, 422, I18n.t("errors.500"))
    end
  end
end
