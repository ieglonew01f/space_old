class FollowersController < ApplicationController
  def show
    followers = User.find(params[:user_id]).followers

    pased_followers = []

    followers.each do |f|
      u = User.find(f.user_id)
      pased_followers << {
        "user_meta" => {
          "photos_count" => u.posts.where('post_meta_id != ?', "NULL").count,
          "videos_count" => u.posts.where('post_link != ?', "").count,
          "followers_count" => u.followers.count
        },
        "user" => u
      }
    end

    if pased_followers
      success_json(200, "Success", pased_followers)
    else
      error_json(422, 422, I18n.t("en.errors.500"))
    end
  end
end
