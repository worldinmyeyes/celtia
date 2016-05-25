class GamesController < ApplicationController
  before_filter :authorize, only: [:create, :show]
  before_filter :update_last_seen, only: [:show, :create, :update, :enginemove2]
  protect_from_forgery :except => [:update, :enginemove2] #MAJOR, MAJOR, REPEAT MAJOR security flaw here. A more robust AJAX solution is needed.
  


  def landing
    @player = Player.new
    render :layout => 'landing'
  end

  def show

    @game_id = params[:game_id] if params[:game_id]
    @game_id = params[:id] if params[:id]
    @game = Game.find_by_id(@game_id)
    @messages = Message.where("game_id = ?", params[:id]).order( 'created_at ASC' )
    @player_playing_game = PlayerPlayingGame.all
    eng = ObjectCache.find(@game_id)
    @eng_game = eng.games[eng.current_game]
    gon.game_state = @game.game_state
    gon.watch.turn_counter = @game.turn_counter
    if !params[:_method].present?

    respond_to do |format|
       format.html
       format.json
       end
    end
    # ----------------when the page is refreshed, detect which player has which spells and enable them----------------
    engine = ObjectCache.find(@game.id.to_s)
    engine.games[engine.current_game].players.each do |i|
      spells = [:flight, :mist, :possess, :freeze, :bolt, :cauldron, :hammer, :shield, :shapeshift]
      spells.each do |s|
        if i.spells[s] == 1
          PrivatePub.publish_to("/games/#{@game.id}", "$('##{s}_button_#{i.turn_order}').removeAttr('disabled');")
        else
          PrivatePub.publish_to("/games/#{@game.id}", "$('##{s}_button_#{i.turn_order}').attr('disabled','disabled');")
        end
      end
    end
    # To show whose turn is it
    PrivatePub.publish_to("/games/#{@game.id}", "$('#chess_board').removeClass('highlighted');")
    @player_to_make_move = engine.games[engine.current_game].players[engine.games[engine.current_game].side_to_move].to_s
    PrivatePub.publish_to("/messages/#{@player_to_make_move}", "$('#chess_board').addClass('highlighted');")
  end

  def index
    if params[:owner]
      @games = Game.where("num_players = ? AND owner = ?", 4, params[:owner]).reject{|g| ObjectCache.find(g.id.to_s).nil?}
      @games2 = Game.where("num_players = ? AND owner = ?", 2, params[:owner]).reject{|g| ObjectCache.find(g.id.to_s).nil?}
      @games3 = Game.where("num_players = ? AND owner = ?", 3, params[:owner]).reject{|g| ObjectCache.find(g.id.to_s).nil?}
      @owner = Player.find_by username: params[:owner]
    else
      @games = Game.where("num_players = 4").reject{|g| ObjectCache.find(g.id.to_s).nil?}
      @games2 = Game.where("num_players = 2").reject{|g| ObjectCache.find(g.id.to_s).nil?}
      @games3 = Game.where("num_players = 3").reject{|g| ObjectCache.find(g.id.to_s).nil?}
    end
  end

  def create
    @game = Game.new({:num_players => params[:num_players].to_i})
    @game.owner = params[:owner]
    @game.save!
    e = ObjectCache.find(@game.id.to_s)
    eng_game = e.games[e.current_game]
    case @game.num_players
    when 3
      eng_game.players[3].piece_list.each do |p|
        p.mercenary= true
      end
      eng_game.players[3].mercenary= true
      eng_game.players[3].active= false
      eng_game.get_moves(eng_game.players[0])
    else
    
    end
    0.upto(3) do |i|
      PlayerPlayingGame.create(:game_id => @game.id, :player_side => "player#{i}")
    end
    @game.update_attributes(:turn_counter => "player0")
    redirect_to game_path(@game)
  end
  
  def update
    @game = Game.find(params[:id])
    
    if @game.black && @game.red && @game.white && @game.green
      @game.update_turn_counter
      @game.update_attributes(game_state: params[:data])
      @game.update_attributes(params[:game])
      
      render nothing: true
    else
      @game.update_attributes(params[:game])
      @game.update_attributes(game_state: params[:data])
      
      update_game_side
      @game.update_turn_counter
      
      redirect_to game_path(@game)
    end    
  end
  
  def enginemove2
    @game = Game.find_by_id(params[:id])
    engine = ObjectCache.find(@game.id.to_s)
    engine.handle_line("move #{params[:fromx]} #{params[:fromy]} #{params[:tox]} #{params[:toy]} #{current_player.username}")
    render text: engine.games[engine.current_game].last_move_okay
    # ------------if last move was ok, publish a refresh trigger to every player in the same room so that every move is reflect in real time-----------
    if engine.games[engine.current_game].last_move_okay == true
      PrivatePub.publish_to("/games/#{@game.id}", 
        "$.ajax({type: 'GET',url: '/games/' + #{@game.id} + '.json',failure: function(msg) {alert('Request unsuccessful, check your internet connection.')},dataType: 'json',success: update});
        $('#chat').append('<li class=\"announcement\"><span class=\"sender\">#{current_player.username}</span> made a move!<span class=\"pull-right small text-muted\">#{DateTime.now.strftime("%H:%M")}</span></li>');
        $('#chess_board').removeClass('highlighted');
        ")
      # To highlight player's board if its his turn
      @player_to_make_move = engine.games[engine.current_game].players[engine.games[engine.current_game].side_to_move].to_s
      PrivatePub.publish_to("/messages/#{@player_to_make_move}", "$('#chess_board').addClass('highlighted');")
      # ----------if a spell is collected, enable the spell button in corresponding player's spell rack------------        
      if engine.games[engine.current_game].spell_list
        # array for all spells
        spells = [:flight, :mist, :possess, :freeze, :bolt, :cauldron, :hammer, :shield, :shapeshift]
        # for each spell, if its value is 1 in spell_list array, meaning it is collected by player, enable the according button
        spells.each do |s|
          if engine.games[engine.current_game].spell_list[s] == 1
            PrivatePub.publish_to("/games/#{@game.id}", "$('##{s}_button_#{engine.games[engine.current_game].side_for_spells}').removeAttr('disabled');")
          else
            PrivatePub.publish_to("/games/#{@game.id}", "$('##{s}_button_#{engine.games[engine.current_game].side_for_spells}').attr('disabled','disabled');")
          end
        end
      end
    end
    PrivatePub.publish_to("/games/#{@game.id}", "$.ajax({type: 'GET',url: '/games/' + #{@game.id} + '.json',failure: function(msg) {alert('Request unsuccessful, check your internet connection.')},dataType: 'json',success: update});")
  end
  
  def enginemovepromote
    @game = Game.find_by_id(params[:id])
    engine = ObjectCache.find(@game.id.to_s)
    engine.handle_line("move_special 9 #{params[:fromx]} #{params[:fromy]} #{params[:piece]}")
    render text: engine.games[engine.current_game].last_move_okay
    # Enabled publishing (refreshing board) after casting the spell. Previously not present.
    PrivatePub.publish_to("/games/#{@game.id}", "$.ajax({type: 'GET',url: '/games/' + #{@game.id} + '.json',failure: function(msg) {alert('Request unsuccessful, check your internet connection.')},dataType: 'json',success: update});")  
  end
  
  def enginemoveshapeshift
    @game = Game.find_by_id(params[:id])
    engine = ObjectCache.find(@game.id.to_s)
    engine.handle_line("move_special 6")
    render text: engine.games[engine.current_game].last_move_okay
    # Enabled publishing (refreshing board) after casting the spell. Previously not present.
    PrivatePub.publish_to("/games/#{@game.id}", "$.ajax({type: 'GET',url: '/games/' + #{@game.id} + '.json',failure: function(msg) {alert('Request unsuccessful, check your internet connection.')},dataType: 'json',success: update});")  
  end
  
  def enginemovepossession
    @game = Game.find_by_id(params[:id])
    engine = ObjectCache.find(@game.id.to_s)
    engine.handle_line("move_special 5")
    render text: engine.games[engine.current_game].last_move_okay
    # Enabled publishing (refreshing board) after casting the spell. Previously not present.
    PrivatePub.publish_to("/games/#{@game.id}", "$.ajax({type: 'GET',url: '/games/' + #{@game.id} + '.json',failure: function(msg) {alert('Request unsuccessful, check your internet connection.')},dataType: 'json',success: update});")  
  end
  
  def enginemoveflight
    @game = Game.find_by_id(params[:id])
    engine = ObjectCache.find(@game.id.to_s)
    engine.handle_line("move_special 7")
    render text: engine.games[engine.current_game].last_move_okay
    # Enabled publishing (refreshing board) after casting the spell. Previously not present.
    PrivatePub.publish_to("/games/#{@game.id}", "$.ajax({type: 'GET',url: '/games/' + #{@game.id} + '.json',failure: function(msg) {alert('Request unsuccessful, check your internet connection.')},dataType: 'json',success: update});")  
  end
  
  def enginemoveresurrect
    @game = Game.find_by_id(params[:id])
    engine = ObjectCache.find(@game.id.to_s)
    engine.handle_line("move_special 10 #{params[:piece]}")
    render text: engine.games[engine.current_game].last_move_okay
    # Enabled publishing (refreshing board) after casting the spell. Previously not present.
    PrivatePub.publish_to("/games/#{@game.id}", "$.ajax({type: 'GET',url: '/games/' + #{@game.id} + '.json',failure: function(msg) {alert('Request unsuccessful, check your internet connection.')},dataType: 'json',success: update});") 
  end
  
  def enginemovefreeze
    @game = Game.find_by_id(params[:id])
    engine = ObjectCache.find(@game.id.to_s)
    engine.handle_line("move_special 3 #{params[:x]} #{params[:y]}")
    render text: engine.games[engine.current_game].last_move_okay
    # Enabled publishing (refreshing board) after casting the spell. Previously not present.
    PrivatePub.publish_to("/games/#{@game.id}", "$.ajax({type: 'GET',url: '/games/' + #{@game.id} + '.json',failure: function(msg) {alert('Request unsuccessful, check your internet connection.')},dataType: 'json',success: update});")
  end
  
  def enginemovezap    
    @game = Game.find_by_id(params[:id])
    engine = ObjectCache.find(@game.id.to_s)
    engine.handle_line("move_special 2 #{params[:x]} #{params[:y]}")
    render text: engine.games[engine.current_game].last_move_okay
    # Enabled publishing (refreshing board) after casting the spell. Previously not present.
    PrivatePub.publish_to("/games/#{@game.id}", "$.ajax({type: 'GET',url: '/games/' + #{@game.id} + '.json',failure: function(msg) {alert('Request unsuccessful, check your internet connection.')},dataType: 'json',success: update});")
  end
  
  def enginemoveshield
    @game = Game.find_by_id(params[:id])
    engine = ObjectCache.find(@game.id.to_s)
    engine.handle_line("move_special 8 #{params[:x]} #{params[:y]}")
    render text: engine.games[engine.current_game].last_move_okay
    PrivatePub.publish_to("/games/#{@game.id}", "$.ajax({type: 'GET',url: '/games/' + #{@game.id} + '.json',failure: function(msg) {alert('Request unsuccessful, check your internet connection.')},dataType: 'json',success: update});")
  end
  
  def enginemovemist
    @game = Game.find_by_id(params[:id])
    engine = ObjectCache.find(@game.id.to_s)
    engine.handle_line("move_special 1 #{params[:x]} #{params[:y]}")
    render text: engine.games[engine.current_game].last_move_okay 
    PrivatePub.publish_to("/games/#{@game.id}", "$.ajax({type: 'GET',url: '/games/' + #{@game.id} + '.json',failure: function(msg) {alert('Request unsuccessful, check your internet connection.')},dataType: 'json',success: update});")
  end

  # WojZscz: added the method called by Javascript in views/games/show.html file. Refers the method in the celtia_rules_engine
  def enginemovewildcard
    @game = Game.find_by_id(params[:id])
    engine = ObjectCache.find(@game.id.to_s)
    engine.handle_line("move_special 11")
    render text: engine.games[engine.current_game].last_move_okay 
    PrivatePub.publish_to("/games/#{@game.id}", "$.ajax({type: 'GET',url: '/games/' + #{@game.id} + '.json',failure: function(msg) {alert('Request unsuccessful, check your internet connection.')},dataType: 'json',success: update});")
  end
  
# WojZscz: added two methods which are called by javascript and refer to two corresponding methods in the celtia_rules_engine
  def random_move
    @game = Game.find_by_id(params[:id])
    engine = ObjectCache.find(@game.id.to_s)
    engine.handle_line("random_move")
    render text: engine.games[engine.current_game].last_move_okay 
    PrivatePub.publish_to("/games/#{@game.id}", "$.ajax({type: 'GET',url: '/games/' + #{@game.id} + '.json',failure: function(msg) {alert('Request unsuccessful, check your internet connection.')},dataType: 'json',success: update});")
  end

  def use_ai
    @game = Game.find_by_id(params[:id])
    engine = ObjectCache.find(@game.id.to_s)
    engine.handle_line("use_ai")
    render text: engine.games[engine.current_game].last_move_okay 
    PrivatePub.publish_to("/games/#{@game.id}", "$.ajax({type: 'GET',url: '/games/' + #{@game.id} + '.json',failure: function(msg) {alert('Request unsuccessful, check your internet connection.')},dataType: 'json',success: update});")
  end
  
  
  def current_side
    current_player.username
  end

  def turn_counter
     
    @game_id = params[:game_id] if params[:game_id]
    @game_id = params[:id] if params[:id]
    @game = Game.find_by_id(@game_id)
    render :partial => "games/turn", locals: {game: @game}
  end

  
  def unset_current_colour
    @game = Game.find_by_id(params[:id])
    engine = ObjectCache.find(@game.id.to_s)
    if @game.red == current_player.username
      @game.red = nil
      engine.games[engine.current_game].players[0].name = ""
    elsif @game.white == current_player.username
      @game.white = nil
      engine.games[engine.current_game].players[1].name = ""
    elsif @game.black == current_player.username
      @game.black = nil
      engine.games[engine.current_game].players[2].name = ""
    elsif @game.green == current_player.username
      @game.green = nil
      engine.games[engine.current_game].players[3].name = ""
    end
  end
  
  def play_as_white
    unset_current_colour
    @game.update_attributes :white => current_player.username
    engine = ObjectCache.find(@game.id.to_s)
    engine.games[engine.current_game].players[1].name = current_player.username
    redirect_to game_path(@game)
  end

  def play_as_red
    unset_current_colour
    @game.update_attributes :red => current_player.username
    engine = ObjectCache.find(@game.id.to_s)
    engine.games[engine.current_game].players[0].name = current_player.username
    redirect_to game_path(@game)
  end

  def play_as_black
    unset_current_colour
    @game.update_attributes :black => current_player.username
    engine = ObjectCache.find(@game.id.to_s)
    engine.games[engine.current_game].players[3].name = current_player.username
    redirect_to game_path(@game)
  end

  def play_as_green
    unset_current_colour
    @game.update_attributes :green => current_player.username
    engine = ObjectCache.find(@game.id.to_s)
    engine.games[engine.current_game].players[2].name = current_player.username
    redirect_to game_path(@game)
  end

  def usage
  end

private
  
  #VERY messy. A slight gotcha here, update_game_side will not set
  #the participant side correctly if the email already exists. If you choose green with the same email
  #as say black, args will get set as player3, NOT player2.
  # Graham: renaming "args" to something a little more descriptive ("side")


    def update_game_side
      side = nil
      case current_player.email
      when @game.black
        side = "player3"
      when @game.red
        side = "player0"
      when @game.white
        side = "player1"
      when @game.green
        side = "player2"
      end
      
      @player_playing_game = PlayerPlayingGame.where(:game_id => @game.id, :player_side => "#{side}").first
      @player_playing_game.player_id = current_player.id
      @player_playing_game.save!
   end
end

