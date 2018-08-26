class AddSeenToMessages < ActiveRecord::Migration[5.1]
  def change
    add_column :messages, :seen, :integer
  end
end
