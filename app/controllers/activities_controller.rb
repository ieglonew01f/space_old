class ActivitiesController < ApplicationController
  def index
    activities = PublicActivity::Activity.where('owner_id = ?', params[:user_id])

    parsed_activities = []

    activities.each do |activity|
      object = activity.trackable_type.constantize
      object_id = activity.trackable_id

      this_object = object.where('id = ?', object_id.to_i).first

      if (this_object.nil?)
        next
      end

      object_owner = this_object.try(:user)
      object_type = "post"

      activity_owner = User.find(activity.owner_id)

      if activity.trackable_type == "Like" or activity.trackable_type == "Comment"
        post_id = object.find(object_id.to_i).post_id
        object_owner = Post.find(post_id).user
      end

      parsed_activities << {
        :object_owner => object_owner,
        :activity_owner => activity_owner,
        :object_type => object_type,
        :object_id => post_id.to_i,
        :message => I18n.t("activity.#{activity.key}"),
        :timestamp => time_ago_in_words(activity.created_at) + " ago"
      }
    end

    if activities
      success_json(200, "Success", parsed_activities)
    else
      error_json(422, 422, I18n.t("errors.500"))
    end
  end
end
