class UsersController < ApplicationController
  def get_all_users
    u = User.all

    if u
      success_json(200, "Success", u)
    else
      error_json(422, 422, I18n.t("errors.500"))
    end
  end

  def set_status
    user = User.find(current_user.id)
    user.status = params[:status]

    if user.save!
      current_user.status = user.status
      success_json(200, "Success", user)
    else
      error_json(422, 422, I18n.t("errors.500"))
    end
  end

  def set_chat_state
    user = User.find(current_user.id)
    user.chat_state = params[:chat_state]

    if user.save!
      current_user.chat_state = user.chat_state
      success_json(200, "Success", user)
    else
      error_json(422, 422, I18n.t("errors.500"))
    end
  end

  def get_photos
    photos = PostMetum.where('user_id = ? AND post_id != ?', params[:id], "")
    success_json(200, "Success", photos)
  end

  def get_birthdays
    birthday_user = User.where("birthday = ?", "#{'%02d' % Date.today.day}/#{'%02d' % Date.today.month}/#{Date.today.year}").first

    success_json(200, "Success", birthday_user)
  end

  def get_suggestions
    suggestions = User.where.not(id: Follower.select("followed_id").where("user_id = ?", current_user.id).map(&:followed_id).push(current_user.id))

    if suggestions
      success_json(200, "Success", suggestions)
    else
      error_json(422, 422, I18n.t("errors.500"))
    end
  end

  def get_friends
    friends = User.where('id != ?', current_user.id)

    users = []

    friends.each do |f|
      other_user = User.find(f.id)
      chat = find_chat(other_user)
      unread_count = 0
      if (!chat.nil?)
        unread_count = Message.where("chat_id = ? AND seen IS NULL", chat.id).count
      end

      users << {
        "details" => f,
        "unread_count" => unread_count
      }
    end

    if friends
      success_json(200, "Success", users)
    else
      error_json(422, 422, I18n.t("errors.500"))
    end
  end

  def update
    user = User.find(current_user.id)
    user.profile_picture = params[:user][:profile_picture]
    user.banner = params[:user][:banner]
    user.save!

    redirect_back fallback_location: root_path
  end

  private
  def find_chat(second_user)
    chats = current_user.chats
    chats.each do |chat|
      chat.subscriptions.each do |s|
        if s.user_id == second_user.id
          return chat
        end
      end
    end
    nil
  end
end
