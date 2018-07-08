class ChangePostMetaToBeTextInPosts < ActiveRecord::Migration[5.1]
  def change
    change_column :posts, :post_meta, :text
  end
end
