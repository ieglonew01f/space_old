class UsersController < ApplicationController
  def get_suggestions
    suggestions = User.connection.select_all("SELECT * FROM users where id NOT IN (SELECT followed_id FROM followers WHERE user_id = #{current_user.id}) AND id != #{current_user.id}").to_hash

    if suggestions
      success_json(200, "Success", suggestions)
    else
      error_json(422, 422, I18n.t("en.errors.500"))
    end
  end
end
