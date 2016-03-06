class AddLastSeenToPlayers < ActiveRecord::Migration
  def change
    add_column :players, :last_seen, :datetime
  end
end
