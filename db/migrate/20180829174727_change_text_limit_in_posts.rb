class ChangeTextLimitInPosts < ActiveRecord::Migration[5.1]
  def change
    change_column :posts, :post_text, :text, :limit => 4294967295
  end
end
