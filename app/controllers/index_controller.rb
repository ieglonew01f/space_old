class IndexController < ApplicationController
  def index
    @college_list = Setting.find_by_name('college_list').setting.split(',')
  end
end
