class AddGameRoomToPlayers < ActiveRecord::Migration
  def change
    add_column :players, :gameRoom, :text
  end
end
