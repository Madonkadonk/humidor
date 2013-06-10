class HumidController < ApplicationController
  def getSaved
    puts Saveddata.find(:all)
    data = Saveddata.find(:all)
    render :json=> data, :callback => params[:callback]
  end

  def getCurrent
    puts Tempdata.order('created_at').last
    data = Tempdata.order('created_at').last
    render :json=> data, :callback => params[:callback]
  end
end
