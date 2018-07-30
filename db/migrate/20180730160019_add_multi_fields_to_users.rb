class AddMultiFieldsToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :facebook, :string
    add_column :users, :twitter, :string
    add_column :users, :hobbies, :text
    add_column :users, :fav_writers, :text
    add_column :users, :fav_books, :text
    add_column :users, :fav_music, :text
    add_column :users, :fav_tv, :text
    add_column :users, :fav_movies, :text
    add_column :users, :fav_games, :text
    add_column :users, :other_intrests, :text
    add_column :users, :college, :text
    add_column :users, :course, :text
    add_column :users, :college_location, :text
    add_column :users, :college_batch, :text
  end
end
