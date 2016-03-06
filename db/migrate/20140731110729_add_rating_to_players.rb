class AddRatingToPlayers < ActiveRecord::Migration
  def change
    add_column :players, :rating, :integer, :default => 0
  end
end
