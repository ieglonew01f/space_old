class UsersController < ApplicationController
  def get_suggestions
    suggestions = User.where("id != ?", current_user.id)

    if suggestions
      success_json(200, "Success", suggestions)
    else
      error_json(422, 422, I18n.t("en.errors.500"))
    end
  end
end
