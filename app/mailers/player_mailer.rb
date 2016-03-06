class PlayerMailer < ActionMailer::Base
  default from: "help@celtiademo.herokuapp.com"

  def password_reset(player)
    @player = player
    mail :to => player.email, :subject => "Password Reset"
  end
end
