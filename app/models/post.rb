class Post < ApplicationRecord
  belongs_to :user
  has_many :comments
  has_many :likes
  has_many :post_meta

  attr_accessor :likes_count, :comments_count, :user_details, :post_image, :timestamp

  include PublicActivity::Model
  tracked owner: Proc.new{ |controller, model| controller.current_user }

  def attributes
    super.merge(:post_image => self.post_image, :likes_count => self.likes_count, :comments_count => self.comments_count, :user_details => self.user_details, :timestamp => self.timestamp)
  end
end
