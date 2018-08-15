class CreateDedications < ActiveRecord::Migration[5.1]
  def change
    create_table :dedications do |t|
      t.string :type
      t.integer :user_id
      t.string :privacy
      t.text :content

      t.timestamps
    end
  end
end
