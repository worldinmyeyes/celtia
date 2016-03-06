class PlayersController < ApplicationController
  respond_to :html, :js
  before_filter :authorize, only: [:show, :edit, :update]
  # before_filter :update_last_seen


  def show
    @player = Player.find(params[:id])
  end
  
  def new
    @player = Player.new
  end
  
  def create
    @player = Player.new(params[:player])
    if @player.save
     cookies[:auth_token] = @player.auth_token 
      redirect_to root_url, notice: "Thank you for registering."
    else
      render "new"
    end
  end

  def edit
      @player = Player.find(params[:id])
  end

  def update
    @player = Player.find(params[:id])
    Game.where("owner = ?", @player.username).update_all :owner => player_params[:username]
    if @player.update_attributes(player_params)
       #Game.where('owner ?', params[:owner == @player.username]).update_all(player_params[:username])
       redirect_to @player, notice: "Profile updated"
    else
      render 'edit'
    end
  end

  private 
    def player_params
      params.require(:player).permit(:username, :email, :password, :password_confirmation)
    end
end