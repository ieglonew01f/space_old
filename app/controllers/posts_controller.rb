class PostsController < ApplicationController
  before_action :authenticate_user!

  def index
    if !params[:user_id].nil?
      posts = Post.where("user_id = ?", params[:user_id]).all.order(created_at: :desc)
    else
      posts = Post.all.order(created_at: :desc)
    end

    posts.each do |post|
      post.likes_count = post.likes.count
      post.comments_count = post.comments.count
      post.user_details = post.user
      post.timestamp = time_ago_in_words(post.created_at) + " ago"
      post.post_image = post.post_meta[0].try(:post_meta).try(:url)
    end

    if posts
      success_json(200, "Success", posts)
    else
      error_json(422, 422, I18n.t("en.errors.500"))
    end
  end

  def create
    post_text = params[:post_text]
    post_type = params[:post_type] || 1
    post_link = params[:post_link]
    post_meta_id = params[:post_meta_id]

    return if post_text.nil?

    post = Post.new
    post.post_text = post_text
    post.user_id = current_user.id
    post.post_type = post_type
    post.post_link = post_link
    post.post_meta_id = post_meta_id

    if post.save
      post.likes_count = post.likes.count
      post.comments_count = post.comments.count
      post.user_details = post.user
      post.timestamp = time_ago_in_words(post.created_at) + " ago"

      pm = PostMetum.where('id = ?', post_meta_id).first

      if (!pm.nil?)
        pm.post_id = post.id
        pm.save
        post.post_image = post.post_meta[0].try(:post_meta).try(:url)
      end

      success_json(200, "Posted successfully", post)
    else
      error_json(422, 422, I18n.t("en.errors.500"))
    end
  end

  def show
    post_id = params[:id]
    post = Post.find(post_id)
    post.likes_count = post.likes.count
    post.comments_count = post.comments.count
    post.user_details = post.user
    post.created_at = time_ago_in_words(post.created_at)
    post.post_image = post.post_meta[0].try(:post_meta).try(:url)

    gon.push({:post => post.as_json})
  end

  def destroy
    post_id = params[:post_id]
    return if post_id.nil?

    post = Post.find(post_id).destroy

    if post
      success_json(200, "Deleted successfully", post)
    else
      error_json(422, 422, I18n.t("errors.500"))
    end
  end

  def upload_photos
    meta = PostMetum.new
    meta.post_meta = params[:images]
    meta.user_id = current_user.id

    if meta.save!
      success_json(200, "post meta updated", meta)
    else
      error_json(422, 422, I18n.t("errors.500"))
    end
  end

  def parseLink
    post_link = params[:post_link]
    return if post_link.nil?

    page = MetaInspector.new(post_link)

    # params = CGI.parse(URI.parse(post_link).query)
    # videoKey = params['v'].first
    # 'thumbnail_url': 'https://img.youtube.com/vi/' + videoKey + '/hqdefault.jpg'

    parsedPageData = {
      'title': page.title,
      'images': page.images,
      'description': page.description,
      'other_images': page.images.with_size,
      'best_image': page.images.best,
      'favicon': page.images.favicon,
      'url': page.url,
      'root_url': page.root_url,
      'is_video': (page.root_url.include? "youtube")
    }

    if parsedPageData
      success_json(200, "Parsed successfully", parsedPageData)
    else
      error_json(422, 422, I18n.t("en.errors.500"))
    end
  end
end
