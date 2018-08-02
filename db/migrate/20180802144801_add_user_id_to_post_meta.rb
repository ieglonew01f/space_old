class AddUserIdToPostMeta < ActiveRecord::Migration[5.1]
  def change
    add_column :post_meta, :user_id, :integer
  end
end
