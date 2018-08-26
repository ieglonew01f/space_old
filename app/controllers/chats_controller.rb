class ChatsController < ApplicationController
  before_action :authenticate_user!
  require 'securerandom'

  def index

  end

  def create
    other_user = User.find(params[:user_id])
    chat = find_chat(other_user) || Chat.new(identifier: SecureRandom.hex)

    if !chat.persisted?
      chat.save
      chat.subscriptions.create(user_id: current_user.id)
      chat.subscriptions.create(user_id: other_user.id)
    end

    messages = Message.where("chat_id = ? ", chat.id)

    resp = {
      :chat => chat,
      :user => other_user,
      :messages => messages
    }

    # set seen to 1
    messages.update_all(seen: 1)

    if chat
      success_json(200, "Success", resp)
    else
      error_json(422, 422, I18n.t("errors.500"))
    end
  end

  def show
    @other_user = User.find(params[:other_user])
    @chat = Chat.find_by(id: params[:id])
    @message = Message.new
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
