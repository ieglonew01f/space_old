class Post < ApplicationRecord
  belongs_to :user
  has_many :comments
  has_many :likes

  attr_accessor :likes_count, :comments_count, :user_details

  include PublicActivity::Model
  tracked owner: Proc.new{ |controller, model| controller.current_user }

  def attributes
    super.merge(:likes_count => self.likes_count, :comments_count => self.comments_count, :user_details => self.user_details)
  end
end
