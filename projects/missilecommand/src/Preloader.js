
MissileCommand.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

MissileCommand.Preloader.prototype = {

	preload: function () {

		this.preloadBar = this.add.sprite(120, 200, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);

		this.load.image('titlepage', 'images/title-page.png');
		this.load.image('land', 'images/land.png');
		this.load.image('marker', 'images/marker.png');
		this.load.image('missile', 'images/missile.png');
		this.load.image('sky', 'images/sky.png');
		this.load.spritesheet('city', 'images/city.png', 64, 36);

	},

	create: function () {

		this.preloadBar.cropEnabled = false;

		this.state.start('MainMenu');

	},

	update: function () {

		// if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		// {
			// this.ready = true;
			// this.state.start('MainMenu');
		// }

	}

};
