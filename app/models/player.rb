class Player < ActiveRecord::Base
has_many :player_lists
has_many :messages
has_many :games, through: :player_playing_games
has_one :game_room


  attr_accessible :email, :password, :password_confirmation, :username
  has_secure_password
  
  validates_uniqueness_of :email, :username
  validates :username, :presence => true
  validates :email, :presence => true
  validates_length_of :password, minimum: 6, on: :create
  before_create { generate_token(:auth_token) }
  
  def generate_token(column)
    begin
      self[column] = SecureRandom.urlsafe_base64
    end while Player.exists?(column => self[column])
  end

  def send_password_reset
	  generate_token(:password_reset_token)
	  self.password_reset_sent_at = Time.zone.now
	  save!
	  PlayerMailer.password_reset(self).deliver
	end
end
