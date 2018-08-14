class AddChatStateToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :chat_state, :string
  end
end
