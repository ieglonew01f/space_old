class CreateConfessions < ActiveRecord::Migration[5.1]
  def change
    create_table :confessions do |t|
      t.text :message
      t.integer :user_id
      t.integer :by_id
      t.string :privacy

      t.timestamps
    end
  end
end
