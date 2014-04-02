
Bomber.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

Bomber.Preloader.prototype = {

	preload: function () {

		this.preloadBar = this.add.sprite(0, 100, 'preloaderBar');

		this.load.setPreloadSprite(this.preloadBar);

		this.load.image('plane', 'images/plane.png');
		this.load.image('bomb', 'images/bomb.png');
		this.load.image('land', 'images/land.png');
		this.load.image('sky', 'images/sky.png');
		this.load.image('photonstorm', 'images/photonstorm.png');
		this.load.spritesheet('particles', 'images/particles.png', 2, 2);
		this.load.spritesheet('city', 'images/city.png', 16, 16);
		this.load.bitmapFont('rollingThunder', 'images/rolling-thunder.png', 'images/rolling-thunder.xml');

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
