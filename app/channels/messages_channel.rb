class MessagesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "messages_#{params[:for_user_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def is_typing(data)
    ActionCable.server.broadcast("messages_#{data['for_id']}",
      action: "is_typing",
      chat_id: data["chat_id"],
      by_id: current_user.id,
      for_id: data["for_id"],
      name: current_user.first_name + ' ' + current_user.last_name,
      profile_picture: current_user.profile_picture.thumb.url,
      is_typing: data["is_typing"]
    )
  end
end
