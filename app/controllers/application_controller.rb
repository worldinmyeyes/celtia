class ApplicationController < ActionController::Base
    protect_from_forgery
    include SessionsHelper

 def build_session(game)
    if game && session[:chess].blank? && game.cookie_items.size <= 2
      puts "1"
      s = CookieItem.create
      game.cookie_items << s
      session[:chess] = s.cookie_token
      return true
    else
      return false
    end
  end
  
  

def authorize
  unless signed_in?
      store_location
      redirect_to '/sessions/new', notice: "Please sign in."
    end
end

 helper_method :current_player
  
private

  def current_player
    @current_player ||= Player.find_by_auth_token( cookies[:auth_token]) if cookies[:auth_token]
  end

  def update_last_seen
   current_player.last_seen = DateTime.now
   current_player.save    
  end
end
