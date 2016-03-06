class PasswordResetsController < ApplicationController
  def new
  end

  def create
	  player = Player.find_by_email(params[:email])
	  player.send_password_reset if player
	  redirect_to root_url, :notice => "Email sent with password reset instructions."
	end

	def edit
	  @player = Player.find_by_password_reset_token!(params[:id])
	end

	def update
	  @player = Player.find_by_password_reset_token!(params[:id])
	  if @player.password_reset_sent_at < 2.hours.ago
	    redirect_to new_password_reset_path, :alert => "Password &crarr; 
	      reset has expired."
	  elsif @player.update_attributes(params[:player])
	    redirect_to root_url, :notice => "Password has been reset."
	  else
	    render :edit
	  end
	end
end
