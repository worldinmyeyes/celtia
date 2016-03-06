module SessionsHelper

	def signed_in? 
		!current_player.nil?
	end

	def current_player=(player) 
		@current_player = player
	end

	def current_player
		auth_token = Player.digest(cookies[:auth_token])
	    @current_player ||= Player.find_by(auth_token: auth_token)
	end

	def current_player?(player)
		player == current_player
	end

	def sign_out
		current_player.update_attribute(:auth_token,
                                  Player.digest(Player.new_auth_token))
		cookies.delete(:auth_token)
		self.current_player = nil
	end

	def redirect_back_or(default)
		redirect_to(session[:return_to] || default)
		session.delete(:return_to)
	end

	def store_location
		session[:return_to] = request.url if request.get?
		
	end

	def correct_player
		@player = Player.find(params[:id])
		redirect_to root_url, notice: "You are not signed in as the correct player." unless current_player?(@player)
	end

	def player_level
		if current_player.rating.between?(0, 100)
			return "Harmless"
		elsif current_player.rating.between?(101, 200)
			return "Mostly Harmless"
		elsif current_player.rating.between?(201, 300)
			return "Competent"
		elsif current_player.rating.between?(301, 400)
			return "Dangerous"
		elsif current_player.rating.between?(401, 500)
			return "Deadly"
		else
			return "Elite"
		end
	end

end
