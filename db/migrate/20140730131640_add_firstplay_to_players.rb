class AddFirstplayToPlayers < ActiveRecord::Migration
  def change
    add_column :players, :firstplay, :boolean, :default => true
  end
end
