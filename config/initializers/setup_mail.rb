ActionMailer::Base.smtp_settings = {  
  :address              => "smtp.gmail.com",  
  :port                 => 587,  
  :domain               => "celtiademo.herokuapp.com",  
  :user_name            => "teamceltia",  
  :password             => "teamceltia1",  
  :authentication       => "plain",  
  :enable_starttls_auto => true  
}

ActionMailer::Base.default_url_options[:host] = "celtiademo.herokuapp.com"  
ActionMailer::Base.default :from => 'help@celtia.com'