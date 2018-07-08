class CommentsController < ApplicationController
  before_action :authenticate_user!

  def index
    post_id = params[:post_id]
    return if post_id.nil?

    comments = Post.find(42).comments.all.order(created_at: :desc)

    if comments
      success_json(200, "Success", comments)
    else
      error_json(422, 422, I18n.t("en.errors.500"))
    end
  end

  def create
    comment_text = params[:comment_text]
    post_id = params[:post_id]

    return if comment_text.nil?

    comment = Comment.new
    comment.comment_text = comment_text
    comment.user_id = current_user.id
    comment.post_id = post_id

    if comment.save
      success_json(200, "Commented successfully", comment)
    else
      error_json(422, 422, I18n.t("errors.500"))
    end
  end

  # def destroy
  #   comment_id = params[:comment_id]
  #   return if comment_id.nil?
  #
  #   comment = Post.find(comment_id).destroy
  #
  #   if comment
  #     success_json(200, "Deleted successfully", comment)
  #   else
  #     error_json(422, 422, I18n.t("en.errors.500"))
  #   end
  # end
end
