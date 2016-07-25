# WojZscz: updated ruby version
ruby "2.2.4"
source 'https://rubygems.org'
#source 'https://1ERqpyfzPh4snbEGJ1pb@gem.fury.io/gmckay/'


gem 'rails'
#  WojZscz: eventmachine gem turned off as manual generation was necessary
#gem 'eventmachine', '1.2.0.1', :git => "git://github.com/eventmachine/eventmachine.git"
gem 'bcrypt-ruby'#, '~> 3.1.2'
gem 'gon'
#  WojZscz: updated source for the gem repository - can be toggled between local repo and bitbucket repo
gem 'celtia_rules_engine', '>= 0.1.50', :git => 'git@bitbucket.org:celtia/seannaiche_rules_engine.git', :branch => 'master'
# gem 'celtia_rules_engine', '>= 0.1.37', :path => '/home/worldinmyeyes/Ruby/Celtia/seannaiche_rules_engine/'
# gem 'celtia_rules_engine_colloque', '~> 0.1'
gem 'rabl'
gem 'oj'

# WojZscz: added pry for easier implementation analysis
gem 'pry'
gem 'responders'
gem 'sprockets', '3.3.3'
gem 'sprockets-rails', '2.3.2'

# Bundle edge Rails instead:
# gem 'rails', :git => 'git://github.com/rails/rails.git'

group :development, :test do
#  gem 'rb-fsevent', '0.9.3'
  gem 'rspec-rails'
  gem 'guard-rspec'
#  gem 'colorize'
end

group :development do
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'byebug'
end

gem 'pg', '0.17'

group :test do
  gem 'factory_girl_rails'
end

group :production do
# WojZscz: this gem HAS to stay in production!
    gem 'rails_12factor'
end

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass'#,   '3.2.10'
  gem 'coffee-rails'
  # See https://github.com/sstephenson/execjs#readme for more supported runtimes
  # gem 'therubyracer', :platforms => :ruby
  # Add these gems
  gem 'uglifier'# WojZscz: version changed, '>= 1.0.3'
end

gem 'jquery-rails'
gem 'jquery-ui-rails'
gem 'simple_form'

# To use ActiveModel has_secure_password
# gem 'bcrypt-ruby', '~> 3.0.0'

# To use debugger
# gem 'debugger'

gem 'thin'
#  WojZscz: uses faye for setting up server and enables chat between users
gem 'private_pub'
gem 'protected_attributes'