class DedicationsController < ApplicationController
  def index

  end

  def create
    d = Dedication.new

    d.type = "song"
    d.user_id = params[:user_id]
    d.privacy = "private"
    d.content = params[:content]
    d.link_meta = params[:link_meta]
    d.by_id = current_user.id

    if d.save!
      success_json(200, "Success", d)
    else
      error_json(422, 422, I18n.t("errors.500"))
    end
  end
end
