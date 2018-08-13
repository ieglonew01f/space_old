class HomeController < ApplicationController
  def index
    user = User.find(current_user.id).as_json
    gon.push(user)
  end
end
