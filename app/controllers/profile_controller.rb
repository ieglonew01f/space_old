class ProfileController < ApplicationController
  include NotificationsHelper

  def index
    username = params[:username]

    #todo redirect if username not found
    #redirect -> 404

    profile_user = User.find_by_username(username)
    gon.push(profile_user.as_json)
    @user = profile_user
  end

  def about
    username = params[:username]

    #todo redirect if username not found
    #redirect -> 404

    profile_user = User.find_by_username(username)
    gon.push(profile_user.as_json)
    @user = profile_user
  end

  def update
    user = User.find(current_user.id)

    if user.update_attributes(user_params)
      flash[:success] = "Settings updated successfully!"
    else
      flash[:error] = "Failed to updated settings!"
    end

    redirect_back fallback_location: root_path
  end

  def profile_settings
    render "profile/settings.haml", locals: {setting: "profile"}
  end

  def hobbies_settings
    render "profile/settings.haml", locals: {setting: "hobbies"}
  end

  def education_settings
    render "profile/settings.haml", locals: {setting: "education"}
  end

  def account_settings
    render "profile/settings.haml", locals: {setting: "account"}
  end

  def update_password
    if params[:user][:old_password]
      if (params[:user][:new_password] == params[:user][:comfirm_password])
        user = User.find(current_user.id)
        user.password = params[:user][:new_password]
        if user.save
          flash[:success] = "Settings updated successfully!"
          redirect_back fallback_location: "/users/sign_in"
        else
          flash[:danger] = "Failed to updated settings!"
          redirect_back fallback_location: root_path
        end
      else
        flash[:danger] = "Your new password doesn't match with confirm password!"
        redirect_back fallback_location: root_path
      end
    else
      flash[:danger] = "Please enter all the details!"
      redirect_back fallback_location: root_path
    end
  end

  private
    def user_params
      params.require(:user).permit(:first_name,
        :last_name, :location, :home_town, :birthday, :facebook, :twitter, :about,
        :hobbies, :fav_tv, :fav_movies, :fav_games, :fav_music, :fav_books, :fav_writers, :other_intrests,
        :course)
    end
end
