class Confession < ApplicationRecord
  belongs_to :user

  attr_accessor :confession_by, :timestamp

  def attributes
    super.merge(:confession_by => self.confession_by, :timestamp => self.timestamp)
  end
end
