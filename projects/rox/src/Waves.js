
Rox.Waves = function (state) {

	this.state = state;
	this.game = state.game;
	this.asteroids = state.asteroids;

	this.LARGE = 1;
	this.MEDIUM = 2;
	this.SMALL = 3;

};

Rox.Waves.prototype = {

	level1: function () {

		//	x, y, size, speed, rotate speed

		this.asteroids.spawn(100, 200, this.LARGE, 100, 40);
		this.asteroids.spawn(200, 400, this.LARGE, 100, 40);
		this.asteroids.spawn(400, 100, this.LARGE, 100, 40);
		this.asteroids.spawn(700, 200, this.LARGE, 100, 40);
		// this.asteroids.spawn(650, 400, this.LARGE, 100, 40);
		// this.asteroids.spawn(500, 500, this.LARGE, 100, 40);

	},

};
