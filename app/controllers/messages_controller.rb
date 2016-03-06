class MessagesController < ApplicationController
  before_filter :authorize

def create
  if params[:message][:game_id].to_s == "0"
    if recipient = params[:message].to_s.match(/@(\w+) (.*?)", "pla/)
      @body = recipient.captures.second.gsub(/'/){ "\\'" }
      if @body.strip.length == 0
        PrivatePub.publish_to("/messages/#{current_player.username}", "
          $('#chat').append('<li class=\"msg_with_error\">You cannot send empty message.</li>');
          $('#new_message')[0].reset();")
      else
        PrivatePub.publish_to("/messages/#{current_player.username}", "
          $('#chat').append('<li class=\"private\">You to <span class=\"sender\">#{recipient.captures.first}</span> : #{@body}<span class=\"pull-right small text-muted\">#{DateTime.now.strftime("%H:%M")}</span></li>');
          $('#new_message')[0].reset();")
        PrivatePub.publish_to("/messages/#{recipient.captures.first}", "$('#chat').append('<li class=\"private\"><span class=\"sender\">#{current_player.username}</span> to You : #{@body}<span class=\"pull-right small text-muted\">#{DateTime.now.strftime("%H:%M")}</span></li>');")
      end
    elsif params[:message][:body] == ""
      PrivatePub.publish_to("/messages/#{current_player.username}", "
        $('#chat').append('<li class=\"msg_with_error\">You cannot send empty message.</li>');
        $('#new_message')[0].reset();")
    else
      PrivatePub.publish_to("/messages/lobby", "
        $('#chat').append('<li><span class=\"sender\">#{current_player.username}</span> : #{params[:message][:body]}<span class=\"pull-right small text-muted\">#{DateTime.now.strftime("%H:%M")}</span></li>');")
      PrivatePub.publish_to("/messages/#{current_player.username}", "
          $('#new_message')[0].reset();")
    end
  else
    if recipient = params[:message].to_s.match(/@(\w+) (.*?)", "pla/)
      @body = recipient.captures.second.gsub(/'/){ "\\'" }
      if @body.strip.length == 0
        PrivatePub.publish_to("/messages/#{current_player.username}", "
          $('#chat').append('<li class=\"msg_with_error\">You cannot send empty message.</li>');
          $('#new_message')[0].reset();")
      else
      	PrivatePub.publish_to("/messages/#{current_player.username}", "
          $('#chat').append('<li class=\"private\">You to <span class=\"sender\">#{recipient.captures.first}</span> : #{@body}<span class=\"pull-right small text-muted\">#{DateTime.now.strftime("%H:%M")}</span></li>');
          $('#new_message')[0].reset();")
      	PrivatePub.publish_to("/messages/#{recipient.captures.first}", "$('#chat').append('<li class=\"private\"><span class=\"sender\">#{current_player.username}</span> to You : #{@body}<span class=\"pull-right small text-muted\">#{DateTime.now.strftime("%H:%M")}</span></li>');")
      end
    	
    elsif params[:message][:body] == ""
      PrivatePub.publish_to("/messages/#{current_player.username}", "
        $('#chat').append('<li class=\"msg_with_error\">You cannot send empty message.</li>');
        $('#new_message')[0].reset();")

    else
    	@message = Message.create!(params[:message])
    	PrivatePub.publish_to("/messages/#{current_player.username}", "$('#new_message')[0].reset();")
    end
  end
end

   def index
    @messages = Message.all
  end
  

end

