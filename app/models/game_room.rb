class GameRoom < ActiveRecord::Base

	attr_accessible :room_name, :profile, :image, :player_id

	validates :room_name, :presence => true
	validates :profile, :presence => true


	belongs_to :player
	has_many :games, -> { order('id DESC') },
	                 :dependent => :nullify

	def owned_by?(owner)
		return false unless owner.is_a?(Player)
		player == owner
	end
end
