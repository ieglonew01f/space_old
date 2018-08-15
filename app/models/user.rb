class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  devise :omniauthable, :omniauth_providers => [:facebook]

  # validates_acceptance_of :terms

  validates :email, :first_name, :last_name, presence: true
  validates :email, uniqueness: true
  validates :first_name, :last_name, length: { maximum: 35 }

  has_many :posts
  has_many :followers, foreign_key: "followed_id"
  has_many :dedications

  mount_uploader :profile_picture, AvatarUploader
  mount_uploader :banner, BannerUploader

  has_many :messages
  has_many :subscriptions
  has_many :chats, through: :subscriptions

  def existing_chats_users
    existing_chat_users = []
    self.chats.each do |chat|
      existing_chat_users.concat(chat.subscriptions.where.not(user_id: self.id).map {|subscription| subscription.user})
    end
    existing_chat_users.uniq
  end

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|

      # essentials
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
      user.first_name = auth.info.first_name
      user.last_name = auth.info.last_name
      candidate_username = auth.info.email.split('@')[0] + "_#{auth.uid}"
      user.username = candidate_username.gsub('.','_')
      user.profile_picture = auth.info.image

      # Others
      user.location = auth.info.location

      # If you are using confirmable and the provider(s) you use validate emails,
      # uncomment the line below to skip the confirmation emails.
      # user.skip_confirmation!
    end
  end

  def self.new_with_session(params, session)
    super.tap do |user|
      if data = session["devise.facebook_data"] && session["devise.facebook_data"]["extra"]["raw_info"]
        user.email = data["email"] if user.email.blank?
      end
    end
  end
end
