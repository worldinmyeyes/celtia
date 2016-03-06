class SessionsController < ApplicationController

def new
  end
  
def create
  player = Player.find_by_email(params[:email])
  if player && player.authenticate(params[:password])
    if params[:remember_me]
      cookies.permanent[:auth_token] = player.auth_token
    else
      cookies[:auth_token] = player.auth_token  
    end
    flash[:notice] = 'Welcome back, ' + current_player.username + "!"
    redirect_back_or root_url
  else
    flash.now.alert = "Invalid email or password"
    render "new"
  end
end

def destroy
  cookies.delete(:auth_token)
  redirect_to root_url, notice: "You have been logged out!"
end
end
