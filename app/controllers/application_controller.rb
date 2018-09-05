class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  include ApplicationHelper
  include PublicActivity::StoreController
  include ActionView::Helpers::DateHelper

  def after_sign_in_path_for(resource)
    '/home'
  end

  def after_sign_out_path_for(resource_or_scope)
    '/users/sign_in'
  end
end
