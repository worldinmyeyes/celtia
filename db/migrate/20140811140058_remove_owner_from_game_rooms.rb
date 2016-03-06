class RemoveOwnerFromGameRooms < ActiveRecord::Migration
  def change
    remove_column :game_rooms, :owner, :string
  end
end
