class PostMetaToPostLinkInPosts < ActiveRecord::Migration[5.1]
  def change
    rename_column :posts, :post_meta, :post_link
  end
end
