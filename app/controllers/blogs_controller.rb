class BlogsController < ApplicationController
  def index
    blogs = Post.where('user_id = ? AND post_type = 3', current_user.id)

    blogs.each do |blog|
      blog.timestamp = time_ago_in_words(blog.created_at) + " ago"
    end

    if blogs
      success_json(200, "Success", blogs)
    else
      error_json(422, 422, I18n.t("errors.500"))
    end
  end

  def show
    post_id = params[:id]
    post = Post.find(post_id)
    post.likes_count = post.likes.count
    post.comments_count = post.comments.count
    post.user_details = post.user
    post.timestamp = time_ago_in_words(post.created_at) + " ago"
    gon.push({:post => post.as_json})
  end
end
