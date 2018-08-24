class RegistrationsController < Devise::RegistrationsController
    after_action :set_user_data, only: [:create]

    private
    def set_user_data
      email = params["user"]["email"]
      user = User.find_by_email(email)

      username = email.split('@')[0] + "_#{user.id}"
      user.username = username.gsub('.','_')
      user.save!
    end

    def sign_up_params
      params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation, :gender, :birthday, :college, :college_batch, :course)
    end

    # def account_update_params
    #   params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation, :current_password)
    # end
  end
