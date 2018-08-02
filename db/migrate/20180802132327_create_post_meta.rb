class CreatePostMeta < ActiveRecord::Migration[5.1]
  def change
    create_table :post_meta do |t|
      t.integer :post_id
      t.text :post_meta

      t.timestamps
    end
  end
end
