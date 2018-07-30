class HomeController < ApplicationController
  include NotificationsHelper
  def index
    get_notifications

    user = User.find(current_user.id).as_json
    gon.push(user)
  end
end
