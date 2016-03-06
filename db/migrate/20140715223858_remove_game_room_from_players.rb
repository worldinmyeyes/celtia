class RemoveGameRoomFromPlayers < ActiveRecord::Migration
  def change
    remove_column :players, :gameRoom, :text
  end
end
