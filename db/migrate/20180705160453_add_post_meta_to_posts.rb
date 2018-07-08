class AddPostMetaToPosts < ActiveRecord::Migration[5.1]
  def change
    add_column :posts, :post_meta, :string
  end
end
