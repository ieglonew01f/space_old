class MessagesController < ApplicationController
  def create
    message = Message.new
    message.content = params[:content]
    message.chat_id = params[:chat_id]
    message.user = current_user

    if message.save
      #broadcasting out to messages channel including the chat_id so messages are broadcasted to specific chat only
      ActionCable.server.broadcast( "messages_#{params[:chat_id]}",
        message: message.content,
        chat_id: message.chat_id
      )
    else
      redirect_to chats_path
    end
  end
end
