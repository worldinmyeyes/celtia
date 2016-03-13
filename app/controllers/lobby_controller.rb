class LobbyController < ApplicationController
  before_filter :authorize
  before_filter :update_last_seen
  respond_to :html, :js
  
  def show
    @players = Player.all
    @game_rooms = GameRoom.all
    @online_players = Player.find :all#, :conditions => ["last_seen > ?", 5.minutes.ago.to_s(:db)]
    @game_room = GameRoom.new
    @messages = Message.where("game_id = ?", 0).limit(0).reverse
  end

end
