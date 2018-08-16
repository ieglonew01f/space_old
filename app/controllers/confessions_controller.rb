class ConfessionsController < ApplicationController
  def index
    confessions = Confession.where('user_id = ?', current_user.id);

    if confessions
      success_json(200, "success", confessions)
    else
      error_json(422, 422, I18n.t("errors.500"))
    end
  end

  def create
    confessions = Confession.new
    confessions.user_id = params[:user_id]
    confessions.message = params[:message]
    confessions.by_id = current_user.id
    confessions.privacy = "only me"

    if confessions.save!
      success_json(200, "success", confessions)
    else
      error_json(422, 422, I18n.t("errors.500"))
    end
  end
end
