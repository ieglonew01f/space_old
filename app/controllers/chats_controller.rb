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

    messages = Message.where("chat_id = ?", chat.id)

    resp = {
      :chat => chat,
      :user => other_user,
      :messages => messages
    }

    # set seen to 1
    # for recieved messages
    Message.where("chat_id = ? AND user_id = ?", chat.id, other_user.id).update_all(seen: 1)

    if chat
      success_json(200, "Success", resp)
    else
      error_json(422, 422, I18n.t("errors.500"))
    end
  end

  def get_messages
    begin
      other_user = User.find(params[:user_id])
      chat = find_chat(other_user)
      messages = Message.where("chat_id = ?", chat.id)

      # set seen to 1
      # for recieved messages
      Message.where("chat_id = ? AND user_id = ?", chat.id, other_user.id).update_all(seen: 1)

      parsed_messages = []

      messages.each do |message|
        parsed_messages.push({
          :user => (message.user_id == current_user.id) ? current_user : other_user,
          :message => message,
          :timestamp => time_ago_in_words(message.created_at) + " ago"
        })
      end

      success_json(200, "success", parsed_messages)
    rescue => err
      logger.error err.message
      error_json(422, 422, I18n.t("errors.500"))
    end
  end

  def get_conversations
    begin
      conversations = []

      chats = current_user.chats

      chats.each do |chat|
        other_user_id = chat.subscriptions.where("user_id != ?", current_user.id).first.try(:user_id)
        unread_messages_count = Message.where("chat_id = ? AND seen IS NULL AND user_id != ?", chat.id, current_user.id).count
        messages = Message.where("chat_id = ?", chat.id)

        if not other_user_id.nil?
          conversations.push({
            :chat_id => chat.id,
            :unread_messages_count => unread_messages_count,
            :user => User.find(other_user_id),
            :messages => messages,
            :last_message => (messages.last.user_id == current_user.id) ? "you: " + messages.last.content : messages.last.content,
            :last_message_timestamp => time_ago_in_words(messages.last.created_at) + " ago"
          })
        end
      end

      success_json(200, "success", conversations)

    rescue => err
      logger.error err.message
      error_json(422, 422, I18n.t("errors.500"))
    end
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
