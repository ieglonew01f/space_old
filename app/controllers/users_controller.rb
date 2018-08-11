class UsersController < ApplicationController
  def get_all_users
    u = User.all

    if u
      success_json(200, "Success", u)
    else
      error_json(422, 422, I18n.t("errors.500"))
    end
  end

  def get_birthdays
    birthday_user = User.where("birthday = ?", "#{'%02d' % Date.today.day}/#{'%02d' % Date.today.month}/#{Date.today.year}").first

    if birthday_user
      success_json(200, "Success", birthday_user)
    else
      error_json(422, 422, I18n.t("errors.500"))
    end
  end

  def get_suggestions
    suggestions = User.connection.select_all("SELECT * FROM users where id NOT IN (SELECT followed_id FROM followers WHERE user_id = #{current_user.id}) AND id != #{current_user.id}").to_hash

    if suggestions
      success_json(200, "Success", suggestions)
    else
      error_json(422, 422, I18n.t("errors.500"))
    end
  end

  def get_friends
    u = User.where('id != ?', current_user.id)

    if u
      success_json(200, "Success", u)
    else
      error_json(422, 422, I18n.t("errors.500"))
    end
  end

  def update
    user = User.find(current_user.id)
    user.profile_picture = params[:user][:profile_picture]
    user.banner = params[:user][:banner]
    user.save!

    redirect_back fallback_location: root_path
  end
end
