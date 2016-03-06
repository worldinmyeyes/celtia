// this still needs a lot of work


describe ('update', function () {
	it('"load_position" is defined', function () { 
		expect (load_position).toBeDefined();
	});
	
	it ('"set_turn_indicator" is defined', function () {
		expect (set_turn_indicator).toBeDefined();
	});

	it ('alerts if the last player was killed', function () {
		expect (shown_lpk).toBeDefined(); 
	});

	it ('shows the result of the game', function () {
		expect (shown_result).toBe(false);
	});

	it ('defines the maximum number of players', function () {
		expect (i=0).toBeLessThan(4);
	});
});

describe ('set_turn_indicator', function () {
	it ('loads the associated image', function () {
		expect (set_turn_indicator).toMatch('.png');
	});

	it ('turn image is 120 x 120px', function () {
		expect (set_turn_indicator).toMatch(120);
	});
});

describe ('set_image', function () {
	it ('ignores spells', function () {
		expect (set_image).toBeTruthy();
	});

	it ('has a solid border whilst dragging', function () {
		expect (set_image).toMatch('style="border-style: solid;');
	});

	it ('needs to have been called with "square" and "ignore_spells"', function () {
		//spyOn('set_image');
		//expect(set_image).toHaveBeenCalledWith('square', 'ignore_spells');
	});
});

describe ('promote the piece', function () {

	it ('alerts if response isnt true', function () {
		// spyOn(alert, 'promote');
		// expect(alert.promote).toHaveBeenCalled();
		// expect (alert.promote).toMatch('Are you sure?');
	});
});

describe ('shapeshift, possesion, flight, resurrect', function () {
	it ('alerts is user is sure', function () {
		// spyOn(alert, 'possession');
		// expect(alert.possession).toHaveBeenCalled(); WHY THE FUUUCCK
	});

	it ('alerts if true', function () {
		expect([shapeshift, possession, flight, resurrect]).toMatch('Are you sure?')
	});

	it ('alerts if false', function () {
		// If response isn't true, alert 'Illegal move!' BDD stuff, get on it.
		expect([shapeshift, possession, flight, resurrect]).toMatch('Illegal move!')
	});
});

describe ('zap_window and cauldron_window', function () {
	it ('asks is you are sure', function () {
		expect([zap_window, cauldron_window]).toBeTruthy();
		expect([zap_window, cauldron_window]).toMatch('Are you sure?');
	});

	it ('does some jquery fade stuff', function () {
		expect([zap_window, cauldron_window]).toMatch('fadeIn()');
		expect(zap_window).toMatch('fadeOut()');
	});
});

describe ('select_freeze, select_zap, select_shield, select_mist', function () {
	it ('asks if you are sure', function () {
		expect([select_freeze, select_zap, select_shield, select_mist]).toMatch('Are you sure?');
	});

	it ('alerts if true, or else nothing?', function () {
		//BDD needs a spy
	});
});

describe ('freeze, zap, shield, mist(params)', function () {
	it ('sends send_command, or else alerts', function () {
		// BDD
	});
});

describe ('find square', function () {
	it ('adds a variable', function () {
		// dunno
	});

	it ('returns function if x and y are true', function () {
		// dunno
	});
});

