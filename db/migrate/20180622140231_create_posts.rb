class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    create_table :posts do |t|
      t.string :post_text
      t.integer :type

      t.timestamps
    end
  end
end
