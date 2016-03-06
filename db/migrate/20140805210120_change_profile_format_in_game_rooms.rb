class ChangeProfileFormatInGameRooms < ActiveRecord::Migration
  def change
  	change_column :game_rooms, :profile, :text
  end
end
