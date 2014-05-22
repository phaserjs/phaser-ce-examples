
Rox.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

Rox.MainMenu.prototype = {

	create: function () {

		// this.music = this.add.audio('titleMusic');
		// this.music.play();
        this.add.image(390, 360, 'photonstorm');

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
