Rails.application.routes.draw do
  get 'home/index'
  get 'profile/:username' => 'profile#index'

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
    end
  end

  resources :posts do
    collection do
      post 'parseLink'
    end

    resources :comments
    resources :likes
  end

  resources :home do
    collection do
      get 'index'
    end
  end
end
