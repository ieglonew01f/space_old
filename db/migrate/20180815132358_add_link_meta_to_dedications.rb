class AddLinkMetaToDedications < ActiveRecord::Migration[5.1]
  def change
    add_column :dedications, :link_meta, :text
  end
end
