Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  #mount ActionCable.server => '/cable'

  get 'home/index'
  get 'profile/:username' => 'profile#index'
  get 'profile/:username/about' => 'profile#about'
  get 'profile/:username/videos' => 'profile#videos'
  get 'profile/:username/photos' => 'profile#photos'
  get 'profile/:username/followers' => 'profile#followers'
  get 'account/settings/profile' => 'profile#profile_settings'
  get 'account/settings/hobbies' => 'profile#hobbies_settings'
  get 'account/settings/education' => 'profile#education_settings'
  get 'account/settings' => 'profile#account_settings'

  get '/dedications' => 'dedications#index'
  get '/confessions' => 'confessions#index'
  get '/confessions/:confession_id' => 'confessions#show'

  get '/users/:id/photos' => 'users#get_photos'

  post 'account/update' => 'profile#update'
  post 'account/update_password' => 'profile#update_password'

  post '/search' => 'search#results'

  post '/users/set_status' => 'users#set_status'
  post '/users/set_chat_state' => 'users#set_chat_state'

  root to: 'index#index'
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks", :registrations => "registrations"}

  devise_scope :user do
    get '/users/sign_out', to: 'devise/sessions#destroy', as: :sign_out
  end

  resources :notifications do
    collection do
      get 'get_activities'
      get 'get_notifications'
    end
  end

  resources :users do
    collection do
      get 'get_suggestions'
      get 'get_friends'
      get 'get_all_users'
      get 'get_birthdays'
    end

    resources :posts
    resources :activities
    resources :chats, only:[:index, :create, :show]
    resources :dedications, only:[:create]
    resources :confessions, only:[:create]

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
