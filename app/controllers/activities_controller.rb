class ActivitiesController < ApplicationController
  def index
    activities = PublicActivity::Activity.all

    parsed_activities = []

    activities.each do |activity|
      if (activity.owner_id != params[:user_id].to_i)
        next
      end

      object = activity.trackable_type.constantize
      object_id = activity.trackable_id

      object_owner = object.find(object_id.to_i).user
      object_type = "post"

      activity_owner = User.find(activity.owner_id)

      if activity.trackable_type == "Like" or activity.trackable_type == "Comment"
        post_id = object.find(object_id.to_i).post_id
        object_owner = Post.find(post_id).user
      end

      # do not show self activities
      # like commenting on you own post
      # liking your own post
      if (object_owner.id == activity.owner_id)
        next
      end

      parsed_activities << {
        :object_owner => object_owner,
        :activity_owner => activity_owner,
        :object_type => object_type,
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
