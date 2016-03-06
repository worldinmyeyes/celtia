# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140818230946) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "game_rooms", force: true do |t|
    t.integer  "player_id"
    t.string   "room_name"
    t.text     "profile"
    t.string   "image"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "game_wrappers", force: true do |t|
    t.string "game"
  end

  create_table "games", force: true do |t|
    t.text     "game_state"
    t.string   "game_token"
    t.integer  "last_moved"
    t.string   "white"
    t.string   "black"
    t.string   "red"
    t.string   "green"
    t.string   "forfeit"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "turn_counter"
    t.integer  "game_wrapper_id"
    t.integer  "num_players"
    t.integer  "game_room_id"
    t.string   "owner"
  end

  create_table "messages", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "game_id"
    t.integer  "player_id"
    t.text     "body"
  end

  create_table "player_playing_games", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "player_side"
    t.integer  "game_id"
    t.integer  "player_id"
  end

  create_table "players", force: true do |t|
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "username"
    t.string   "auth_token"
    t.string   "password_reset_token"
    t.datetime "password_reset_sent_at"
    t.boolean  "firstplay",              default: true
    t.integer  "rating",                 default: 0
    t.datetime "last_seen"
  end

end
