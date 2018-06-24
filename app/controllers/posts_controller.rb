class PostsController < ApplicationController
  before_action :authenticate_user!
  def index
    posts = Post.all.order(created_at: :desc)

    if posts
      success_json(200, "Success", posts)
    else
      error_json(422, 422, I18n.t("en.errors.500"))
    end
  end

  def create
    post_text = params[:post_text]
    post_type = params[:post_type] || 1

    return if post_text.nil?

    post = Post.new
    post.post_text = post_text
    post.user_id = current_user.id
    post.post_type = post_type

    if post.save
      success_json(200, "Posted successfully", post)
    else
      error_json(422, 422, I18n.t("en.errors.500"))
    end
  end

  def destroy
    post_id = params[:post_id]
    return if post_id.nil?

    post = Post.find(post_id).destroy

    if post
      success_json(200, "Deleted successfully", post)
    else
      error_json(422, 422, I18n.t("en.errors.500"))
    end
  end
end
