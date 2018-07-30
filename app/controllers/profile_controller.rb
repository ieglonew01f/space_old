class ProfileController < ApplicationController
  include NotificationsHelper
  
  def index
    username = params[:username]

    #todo redirect if username not found
    #redirect -> 404

    profile_user = User.find_by_username(username).as_json
    gon.push(profile_user)
  end
end
