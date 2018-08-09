class SearchController < ApplicationController
  def results
    query = params[:query]
    type = params[:type]

    if (type == "users")
      r = User.where('first_name LIKE :query OR last_name LIKE :query', query: "%#{query}%").limit(1)
    end

    if r
      success_json(200, "Success", r)
    else
      error_json(422, 422, I18n.t("errors.500"))
    end
  end
end
