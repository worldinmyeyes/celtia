class AddGameRoomIdToGames < ActiveRecord::Migration
  def change
    add_column :games, :game_room_id, :integer
  end
end
