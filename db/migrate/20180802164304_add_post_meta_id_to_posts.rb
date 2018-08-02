class AddPostMetaIdToPosts < ActiveRecord::Migration[5.1]
  def change
    add_column :posts, :post_meta_id, :integer
  end
end
