class ChangePostTextToTextInPosts < ActiveRecord::Migration[5.1]
  def change
    change_column :posts, :post_text, :text
  end
end
