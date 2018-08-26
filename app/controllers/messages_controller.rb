class MessagesController < ApplicationController
  def create
    message = Message.new
    message.content = params[:content]
    message.chat_id = params[:chat_id]
    message.user = current_user

    if message.save
      #broadcasting out to messages channel including the chat_id so messages are broadcasted to specific chat only
      ActionCable.server.broadcast( "messages_#{params[:for_id]}",
        action: "recieve_message",
        message: message.content,
        chat_id: message.chat_id,
        by_id: current_user.id,
        for_id: params[:for_id].to_i,
        name: current_user.first_name + ' ' + current_user.last_name,
        profile_picture: current_user.profile_picture.thumb.url,
        chat_state: current_user.chat_state
      )
    else
      redirect_to chats_path
    end
  end
end
