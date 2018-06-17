class AddUserDetailsToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :birthday, :string
    add_column :users, :gender, :string
    add_column :users, :username, :string
    add_column :users, :profile_picture, :string
    add_column :users, :home_town, :string
    add_column :users, :location, :string
    add_column :users, :about, :text
  end
end
