class VideosController < ApplicationController
  def show
    posts = User.find(params[:user_id]).posts.where('post_link != ?', '')

    if posts
      success_json(200, "Success", posts)
    else
      error_json(422, 422, I18n.t("en.errors.500"))
    end
  end
end
