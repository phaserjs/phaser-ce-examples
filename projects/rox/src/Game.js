
Rox.Game = function (game) {

	this.player;
	this.asteroids;
	this.explosions;
	this.waves;
	this.font;

	this.cursors;
	this.fireButton;

};

Rox.Game.prototype = {

	create: function () {

		var bg = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');

		this.player = new Rox.Player(this.game, this.game.world.centerX, this.game.world.centerY);
		this.asteroids = new Rox.Asteroids(this);

		this.add.existing(this.player.trail);
		this.add.existing(this.player.bullets);
		this.add.existing(this.asteroids);
		this.add.existing(this.player.muzzle);
		this.add.existing(this.player);

		this.waves = new Rox.Waves(this);

		this.waves.level1();

		//	Still think maybe this ought to be inside the Player class
		this.cursors = this.input.keyboard.createCursorKeys();
		this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		// this.world.sendToBack(bg);

		//	add a colon
	    this.font = this.add.retroFont('font', 14, 14, '0123456789:,!.+?ABCDEFGHIJKLMNOPQRSTUVWXYZ', 42);
	    this.font.text = 'score: 23000                                   lives: 3';
	    // this.font.text = 'space rox';

	    this.add.image(16, 16, this.font);

	},

	update: function () {

	    this.player.zero();

	    if (this.cursors.up.isDown)
	    {
	    	this.player.thrust();
	    }

	    if (this.cursors.left.isDown)
	    {
	    	this.player.rotateLeft();
	    }
	    else if (this.cursors.right.isDown)
	    {
	    	this.player.rotateRight();
	    }

	    if (this.fireButton.isDown)
	    {
	    	this.player.fire();
	    }

	    this.game.physics.arcade.overlap(this.player.bullets, this.asteroids, this.hit, null, this);

	},

	hit: function (bullet, roid) {

		bullet.kill();

		this.asteroids.hit(roid);

	},

    render: function () {

    	// this.game.debug.text(this.asteroids.total, 20, 580);

    },

    gameOver: function () {
    },

	quitGame: function () {

		this.state.start('MainMenu');

	}

};
