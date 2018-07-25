class RegistrationsController < Devise::RegistrationsController
    after_action :set_user_data, only: [:create]

    private
    def set_user_data
      email = params["user"]["email"]
      user = User.find_by_email(email)

      username = email.split('@')[0] + "_#{user.id}"
      user.username = username.gsub('.','_')

      if params["user"]["gender"] === "0"
        profile_picture = "/avatars/female_" + rand(1..2).to_s + ".jpg"
      else
        profile_picture = "/avatars/boy_" + rand(1..7).to_s + ".jpg"
      end

      user.profile_picture = profile_picture
      user.save!
    end

    def sign_up_params
      params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation, :gender, :birthday)
    end

    # def account_update_params
    #   params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation, :current_password)
    # end
  end
