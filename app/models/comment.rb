class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :user

  attr_accessor :user_details

  include PublicActivity::Model
  tracked owner: Proc.new{ |controller, model| controller.current_user }

  def attributes
    super.merge(:user_details => self.user_details)
  end
end
