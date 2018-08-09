class CreateSettings < ActiveRecord::Migration[5.1]
  def change
    create_table :settings do |t|
      t.string :name
      t.text :setting
      t.string :active

      t.timestamps
    end
  end
end
