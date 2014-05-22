
Rox.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

Rox.Preloader.prototype = {

	preload: function () {

		this.preloadBar = this.add.sprite(0, 100, 'preloaderBar');

		this.load.setPreloadSprite(this.preloadBar);

		this.load.image('photonstorm', 'images/photonstorm.png');
		this.load.image('space', 'images/space.png');
		this.load.image('font', 'images/font.png');

		this.load.image('ship', 'images/ship.png');
		this.load.image('jets', 'images/jets.png');
		this.load.image('bullet', 'images/bullets.png');
		this.load.image('beam', 'images/beam.png');
		this.load.spritesheet('flash', 'images/muzzle-flash.png', 48, 48);
		this.load.spritesheet('explode', 'images/explode.png', 26, 26);

		this.load.image('asteroid1', 'images/asteroid1.png');
		this.load.image('asteroid2', 'images/asteroid2.png');
		this.load.image('asteroid3', 'images/asteroid3.png');
		this.load.image('asteroid4', 'images/asteroid4.png');
		this.load.image('asteroid5', 'images/asteroid5.png');
		this.load.image('asteroid6', 'images/asteroid6.png');
		this.load.image('asteroid7', 'images/asteroid7.png');
		this.load.image('asteroid8', 'images/asteroid8.png');
		this.load.image('asteroid9', 'images/asteroid9.png');
		this.load.image('asteroid10', 'images/asteroid10.png');
		this.load.image('asteroid11', 'images/asteroid11.png');

	},

	create: function () {

		this.state.start('Game');

	},

	update: function () {

		// if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		// {
			// this.ready = true;
			// this.state.start('MainMenu');
		// }

	}

};
