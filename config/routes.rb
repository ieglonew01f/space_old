Rails.application.routes.draw do
  get 'home/index'

  root to: 'index#index'
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks", :registrations => "registrations"}

  devise_scope :user do
    get '/users/sign_out', to: 'devise/sessions#destroy', as: :sign_out
  end

  resources :posts

  resources :home do
    collection do
      get 'index'
    end
  end
end
