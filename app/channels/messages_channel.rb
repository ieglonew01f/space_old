class MessagesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "messages_#{params[:for_user_id]}"
    stream_from "global_channel"

    if (current_user && (current_user.chat_state.nil? || current_user.chat_state == "disconected"))
      current_user.chat_state = "online"
      current_user.save
    end

    # notify everyone
    ActionCable.server.broadcast("global_channel",
      action: "set_chat_state",
      user_id: current_user.id,
      chat_state: current_user.chat_state
    )
  end

  def unsubscribed
    if (current_user && (current_user.chat_state.nil? || current_user.chat_state == "online"))
      current_user.chat_state = "disconected"
      current_user.save
    end

    ActionCable.server.broadcast("global_channel",
      action: "set_chat_state",
      user_id: current_user.id,
      chat_state: current_user.chat_state
    )
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
