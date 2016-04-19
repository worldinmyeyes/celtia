Celtia::Application.routes.draw do


  get "password_resets/new"

  resources :players
  resources :sessions
  resources :password_resets
  resources :game_rooms
  resources :messages do
  
  member do
  
  get "message_list" 
  end
  
  
  end

  resources :games do
   
  #get 'update_game_red', :on => :member, :as => update_game_red

    member do
      get "last_moved"
      get "turn_counter"
      put 'update_game_red'
      post "command"
      post "enginemove2"
      post "enginemovepromote"
      post "enginemovewildcard"
      post "enginemoveresurrect"
      post "enginemoveshapeshift"
      post "enginemovepossession"
      post "enginemoveflight"
      post "enginemovefreeze"
      post "enginemovezap"
      post "enginemoveshield"
      post "enginemovemist"
      post "random_move"
      post "use_ai"
      put "play_as_white"
      put "play_as_red"
      put "play_as_green"
      put "play_as_black"
    end

    #resource :whites, only: [:show]
    #resource :blacks, only: [:show]
    #resource :greens, only: [:show]
    #resource :reds, only: [:show]
  end

  get "/usage", :to => "games#usage", :as => :usage
  get "/story", :to => "home#storyboard", :as => "story"
  get "/lobby", :to => "lobby#show", :as => "playerintro"

  resource :error, only: [:show]

  root to: "games#landing"
end
