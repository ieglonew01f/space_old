class AddByIdToDedications < ActiveRecord::Migration[5.1]
  def change
    add_column :dedications, :by_id, :integer
  end
end
