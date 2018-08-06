class MessagesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "messages_#{params[:for_user_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
