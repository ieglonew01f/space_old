class CreateFollowers < ActiveRecord::Migration[5.1]
  def change
    create_table :followers do |t|
      t.integer :followed_id
      t.integer :user_id

      t.timestamps
    end
  end
end
