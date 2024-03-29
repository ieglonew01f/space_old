class FollowsController < ApplicationController
  def create
    user_id = params[:user_id]

    if (user_id.nil?)
      error_json(422, 422, I18n.t("en.errors.500"))
    end

    #test if already followed
    is_followed = Follower.where('followed_id = ? AND user_id = ?', user_id, current_user.id)

    if (is_followed.length == 0)
      followed = Follower.new
      followed.followed_id = user_id
      followed.user_id = current_user.id
      followed.save
    end

    suggestions = User.connection.select_all("SELECT * FROM users where id NOT IN (SELECT followed_id FROM followers WHERE user_id = #{current_user.id}) AND id != #{current_user.id}").to_hash

    if suggestions
      success_json(200, "Success", suggestions)
    else
      error_json(422, 422, I18n.t("en.errors.500"))
    end
  end

  def destroy
    user_id = params[:user_id]

    if (user_id.nil?)
      error_json(422, 422, I18n.t("en.errors.500"))
    end

    followed = Follower.where('followed_id = ? AND user_id = ?', user_id, current_user.id).first

    if (followed)
      followed.destroy
    end

    success_json(200, "Success", followed)
  end
end
