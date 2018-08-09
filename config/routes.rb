Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  # mount ActionCable.server => '/cable'

  get 'home/index'
  get 'profile/:username' => 'profile#index'
  get 'profile/:username/about' => 'profile#about'
  get 'profile/:username/videos' => 'profile#videos'
  get 'profile/:username/followers' => 'profile#followers'
  get 'account/settings/profile' => 'profile#profile_settings'
  get 'account/settings/hobbies' => 'profile#hobbies_settings'
  get 'account/settings/education' => 'profile#education_settings'
  get 'account/settings' => 'profile#account_settings'

  post 'account/update' => 'profile#update'
  post 'account/update_password' => 'profile#update_password'

  post '/search' => 'search#results'

  root to: 'index#index'
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks", :registrations => "registrations"}

  devise_scope :user do
    get '/users/sign_out', to: 'devise/sessions#destroy', as: :sign_out
  end

  resources :notifications do
    collection do
      get 'get_activities'
    end
  end

  resources :users do
    collection do
      get 'get_suggestions'
      get 'get_friends'
      get 'get_all_users'
    end

    resources :posts
    resources :activities
    resources :chats, only:[:index, :create, :show]

    resource :follow
    resource :followers
    resource :videos
  end

  resources :posts do
    collection do
      post 'parseLink'
      post 'upload_photos'
    end

    resources :comments
    resources :likes
  end

  resources :messages, only:[:create]

  resources :home do
    collection do
      get 'index'
    end
  end
end
