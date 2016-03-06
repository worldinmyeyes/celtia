class GameRoomsController < ApplicationController
	before_filter :authorize
	before_action :load_player, :only => [:create, :destroy, :edit, :update]

    def new
		@game_room = GameRoom.new
	end

	def show
		  @game_rooms = GameRoom.all
		  @game_room = GameRoom.find(params[:id])
		  @player = Player.all
    end

	def create
		@game_room = GameRoom.new(game_room_params)
	       if GameRoom.where(player_id: current_player.id).size >= 1 
	           flash[:error] = "You already have a room!"
	           redirect_to playerintro_path 
	       else
	         if @game_room.save
	         	@player.game_room = @game_room 
	         	redirect_to @player.game_room, notice: "Your room has been created"
	         else
	         	render "new"
	         end
	       end

	end

	def edit
		@game_room = GameRoom.find(params[:id]) 
		# flash[:notice] = "You can change your details"
    end

    def update
    	@game_room = GameRoom.find(params[:id])
    	if @game_room.update(game_room_params)
    		redirect_to @game_room, notice: 'Room details has been updated'
        else
        	render action: 'edit'
        end
    end

	def destroy
		@game_room = GameRoom.find(params[:id])
		if @game_room.destroy
		   redirect_to playerintro_path, notice: 'Your room has been deleted'
	    end
	end
    
	

	private

	def load_player
		@player = current_player
	end

	def game_room_params
		params.require(:game_room).permit(:room_name, :profile, :image)
	end
end