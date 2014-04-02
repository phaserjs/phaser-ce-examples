
Bomber.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

    this.cities = [];
    this.heights = [ 2, 3, 3, 3, 4, 4, 5, 5, 5, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 9, 10, 10, 10, 12, 14, 14 ];

};

Bomber.MainMenu.prototype = {

	create: function () {

		// this.music = this.add.audio('titleMusic');
		// this.music.play();

        this.add.image(0, 0, 'sky');
        this.land = this.add.sprite(0, 336, 'land');
        this.add.image(390, 360, 'photonstorm');

	    var t = this.add.bitmapText(0, 64, 'rollingThunder', 'BOMBER', 32);
	    t.x = 256 - (t.textWidth / 2);

        this.heights = Phaser.Utils.shuffle(this.heights);

        for (var i = 0; i < this.heights.length; i++)
        {
            this.cities.push(new Bomber.City(this.game, 48 + i * 16, this.heights[i]));
        }

        this.input.onDown.addOnce(this.startGame, this);

	},

	update: function () {

	},

	startGame: function (pointer) {

		// this.music.stop();

		//	And start the actual game
		this.state.start('Game');

	}

};
