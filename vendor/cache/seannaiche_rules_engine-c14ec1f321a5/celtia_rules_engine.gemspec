# -*- encoding: utf-8 -*-
# stub: celtia_rules_engine 0.1.50 ruby lib

Gem::Specification.new do |s|
  s.name = "celtia_rules_engine"
  s.version = "0.1.50"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Wojciech Szczerek/Graham McKay (team celtia)"]
  s.date = "2016-07-25"
  s.email = "w.szczerek.12@aberdeen.ac.uk"
  s.executables = ["celtia_rules_engine", "web_runner"]
  s.files = ["Gemfile", "Gemfile.lock", "Procfile", "README", "Rakefile", "bin/celtia_rules_engine", "bin/web_runner", "test/log.txt", "test/test_games", "test/test_games/banshidh_pretemple_accessibility", "test/test_games/cauldron_wildcard_bolt_revive", "test/test_games/cauldron_wildcard_flight", "test/test_games/cauldron_wildcard_freeze", "test/test_games/cauldron_wildcard_mist", "test/test_games/cauldron_wildcard_possess", "test/test_games/cauldron_wildcard_shapeshift", "test/test_games/cauldron_wildcard_shield", "test/test_games/cauldron_wildcard_zap", "test/test_games/freeze_test_block", "test/test_games/spell-freeze-own-and-sean", "test/test_games/spell-mist-own-and-sean", "test/test_games/spell-zap-own-and-sean", "test/test_games/spellhammer-tower-entry-use", "test/unused_test_games", "test/unused_test_games/2player_spellcasting", "test/unused_test_games/2seandown.txt", "test/unused_test_games/bolt_revive_test", "test/unused_test_games/capture_across_cauldron", "test/unused_test_games/cauldron_spell", "test/unused_test_games/flight_capture_bansidh", "test/unused_test_games/flight_test", "test/unused_test_games/freeze_test_deactivate", "test/unused_test_games/king_diag_move_from_temple", "test/unused_test_games/merc_pawn_to_cauldron", "test/unused_test_games/merc_test", "test/unused_test_games/mist_test", "test/unused_test_games/possess_protect", "test/unused_test_games/promote_test3", "test/unused_test_games/promote_test4", "test/unused_test_games/sean-climb.txt", "test/unused_test_games/sean_enter_cauldron_test", "test/unused_test_games/seannachaiche_capture_cauldron_recovery_test.txt", "test/unused_test_games/shapeshift_clear", "test/unused_test_games/shapeshift_test", "test/unused_test_games/shapeshift_test2", "test/unused_test_games/shapeshift_test_capture", "test/unused_test_games/shield", "test/unused_test_games/shield2", "test/unused_test_games/spell-bolt.txt", "test/unused_test_games/spell-flight.txt", "test/unused_test_games/spell-mist.txt", "test/unused_test_games/spell-possess.txt", "test/unused_test_games/spell-promote.txt", "test/unused_test_games/spell_freeze.txt", "test/unused_test_games/spell_immunity", "test/unused_test_games/win_by_capture", "test/unused_test_games/win_by_cauldron"]
  s.rubygems_version = "2.4.8"
  s.summary = "Rules engine for Celtia."

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<rspec>, [">= 0"])
    else
      s.add_dependency(%q<rspec>, [">= 0"])
    end
  else
    s.add_dependency(%q<rspec>, [">= 0"])
  end
end
