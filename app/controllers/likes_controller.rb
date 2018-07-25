class LikesController < ApplicationController
  def index
    post_id = params[:post_id]

    post_likes = Post.find(post_id).likes

    if post_likes
      success_json(200, "Likes listed", post_likes)
    else
      error_json(422, 422, I18n.t("api.errors.500"))
    end
  end

  def create
    post_id = params[:post_id]

    if !Like.find_by_post_id(post_id).nil?
      error_json(422, 422, I18n.t("api.errors.500"))
      return
    end

    like = Like.new
    like.post_id = post_id
    like.user_id = current_user.id

    if like.save
      success_json(200, "Liked successfully", like)
    else
      error_json(422, 422, I18n.t("api.errors.500"))
    end
  end
end
