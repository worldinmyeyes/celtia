ActionMailer::Base.smtp_settings = {  
  :address              => "smtp.gmail.com",  
  :port                 => 587,  
  :domain               => "http://celtiagame.herokuapp.com",  
  :user_name            => "teamceltia",  
  :password             => "teamceltia1",  
  :authentication       => "plain",  
  :enable_starttls_auto => true  
}

ActionMailer::Base.default_url_options[:host] = "http://celtiagame.herokuapp.com" 
ActionMailer::Base.default :from => 'help@celtia.com'