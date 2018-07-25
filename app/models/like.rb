class Like < ApplicationRecord
  belongs_to :post
  belongs_to :user

  include PublicActivity::Model
  tracked owner: Proc.new{ |controller, model| controller.current_user }
end
