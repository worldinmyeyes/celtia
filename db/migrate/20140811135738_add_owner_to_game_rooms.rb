class AddOwnerToGameRooms < ActiveRecord::Migration
  def change
    add_column :game_rooms, :owner, :string
  end
end
