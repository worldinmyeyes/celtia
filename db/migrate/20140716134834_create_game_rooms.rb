class CreateGameRooms < ActiveRecord::Migration
  def change
    create_table :game_rooms do |t|
      t.integer :player_id
      t.string :room_name
      t.text :profile
      t.string :image

      t.timestamps
    end
  end
end
