Rox = {

    /* Here we've just got some global level vars that persist regardless of State swaps */
    score: 0,

    /* If the music in your game needs to play through-out a few State swaps, then you could reference it here */
    music: null,

    /* Your game can check Rox.orientated in internal loops to know if it should pause or not */
    orientated: false

};

Rox.Boot = function (game) {
};

Rox.Boot.prototype = {

    preload: function () {

        this.load.image('preloaderBar', 'images/preload.png');

    },

    create: function () {

        // this.stage.smoothed = false;
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.input.maxPointers = 1;

        // this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = 320;
            this.scale.minHeight = 200;
            this.scale.maxWidth = 800;
            this.scale.maxHeight = 600;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.setScreenSize(true);
        }
        else
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = 480;
            this.scale.minHeight = 260;
            this.scale.maxWidth = 1024;
            this.scale.maxHeight = 768;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(true, false);
            this.scale.setResizeCallback(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            this.scale.setScreenSize(true);
        }

        this.state.start('Preloader');

    },

    gameResized: function (width, height) {
    },

    enterIncorrectOrientation: function () {

        Rox.orientated = false;

        document.getElementById('orientation').style.display = 'block';

    },

    leaveIncorrectOrientation: function () {

        Rox.orientated = true;

        document.getElementById('orientation').style.display = 'none';

    }

};

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
		this.load.image('bullet', 'images/bullets.png');
		this.load.image('ship', 'images/ship.png');
		this.load.spritesheet('flash', 'images/muzzle-flash.png', 48, 48);
		this.load.image('asteroid1', 'images/asteroid1.png');
		this.load.image('asteroid2', 'images/asteroid2.png');
		this.load.image('asteroid3', 'images/asteroid3.png');

		// this.load.image('jets', 'images/jets.png');
		// this.load.image('jets', '../../examples/assets/particles/muzzleflash7.png');
		this.load.image('jets', 'images/smoke.png');

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

Rox.Player = function (game, x, y) {

    Phaser.Sprite.call(this, game, x, y, 'ship');

    this.anchor.set(0.5);

    //  Handy physics ref
    this.physics = game.physics.arcade;

    this.physics.enable(this);

    this.body.drag.set(100);
    this.body.maxVelocity.set(200);

    this.speed = 200;
    this.turnSpeed = 300;

    //  The flash of the guns as we fire them
    this.muzzle = new Phaser.Sprite(game, x, y, 'flash', 0);
    this.muzzle.anchor.set(0.5);

    this.muzzle.animations.add('fire1', [ 0, 1, 0 ], 30, false);
    this.muzzle.animations.add('fire2', [ 0, 2, 0 ], 30, false);
    this.muzzle.animations.add('fire3', [ 0, 3, 0 ], 30, false);
    this.muzzle.animations.add('fire4', [ 0, 4, 0 ], 30, false);

    //  Our bullets - this is a Phaser.Group that we manage from here
    this.bullets = new Rox.PlayerBullets(game, 50);

    //  The smoke trail following the player
    this.trail = new Phaser.Particles.Arcade.Emitter(game, 0, 0, 1000);
    this.trail.makeParticles('jets');
    // this.trail.setRotation(0, 0);
    this.trail.gravity = 0;
    this.trail.minParticleSpeed.set(-50, 50);
    this.trail.maxParticleSpeed.set(50, 100);
    this.trail.setAlpha(1, 0, 3000);
    // this.trail.setScale(2, 0, 2, 0, 3000); // great for jets
    this.trail.setScale(1, 0, 1, 0, 3000);

    this.isThrusting = false;

    return this;

}

Rox.Player.prototype = Object.create(Phaser.Sprite.prototype);
Rox.Player.prototype.constructor = Rox.Player;

Rox.Player.prototype.update = function () {

    //  Happens AFTER the State update
    this.game.world.wrap(this, 16);

    this.muzzle.x = this.x;
    this.muzzle.y = this.y;
    this.muzzle.rotation = this.rotation;

    this.trail.emitX = this.x;
    this.trail.emitY = this.y;

    var px = this.body.velocity.x;
    var py = this.body.velocity.y;

    px *= -1;
    py *= -1;

    this.trail.minParticleSpeed.set(px, py);
    this.trail.maxParticleSpeed.set(px, py);

    if (this.body.speed > 50 && !this.isThrusting)
    {
        this.trail.start(true, 3000, 8);
    }

    this.trail.forEachExists(this.game.world.wrap, this.game.world);

}

Rox.Player.prototype.zero = function () {

    this.body.acceleration.set(0);
    this.body.angularVelocity = 0;
    this.isThrusting = false;

}

Rox.Player.prototype.thrust = function () {

    this.physics.accelerationFromRotation(this.rotation, this.speed, this.body.acceleration);
    
    this.trail.start(true, 3000, 8);

    this.isThrusting = true;

}

Rox.Player.prototype.rotateLeft = function () {

    this.body.angularVelocity = -this.turnSpeed;

}

Rox.Player.prototype.rotateRight = function () {

    this.body.angularVelocity = this.turnSpeed;

}

Rox.Player.prototype.fire = function () {

    if (this.bullets.fire(this))
    {
        this.muzzle.play('fire1');
    }

}

Rox.PlayerBullets = function (game, quantity) {

    Phaser.Group.call(this, game);

    //  Handy physics ref
    this.physics = game.physics.arcade;

    this.enableBody = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;

    //  The maximum number of bullets for the player
    this.createMultiple(quantity, 'bullet');

    this.setAll('anchor.x', 0.5);
    this.setAll('anchor.y', 0.5);

    this.fireRate = 100;
    this.bulletTime = 0;
    this.bulletSpeed = 400;
    this.bulletLifeSpan = 1500;

    return this;

}

Rox.PlayerBullets.prototype = Object.create(Phaser.Group.prototype);
Rox.PlayerBullets.prototype.constructor = Rox.PlayerBullets;

Rox.PlayerBullets.prototype.update = function () {

    this.forEachExists(this.game.world.wrap, this.game.world);

}

Rox.PlayerBullets.prototype.fire = function (player) {

    if (this.game.time.now >= this.bulletTime)
    {
        var bullet = this.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(player.body.x + 16, player.body.y + 16);

            bullet.lifespan = this.bulletLifeSpan;
            bullet.rotation = player.rotation;

            this.physics.velocityFromRotation(player.rotation, this.bulletSpeed, bullet.body.velocity);

            this.bulletTime = this.game.time.now + this.fireRate;

            return true;
        }
    }

    return false;

}

Rox.Asteroid = function (game, x, y) {

    Phaser.Sprite.call(this, game, x, y, 'asteroid3');

    this.anchor.set(0.5);

    //  Handy physics ref
    this.physics = game.physics.arcade;

    this.physics.enable(this);

    this.body.velocity.x = 67;
    this.body.velocity.y = 139;
    this.body.angularVelocity = 30;

    this.speed = 100;

    return this;

}

Rox.Asteroid.prototype = Object.create(Phaser.Sprite.prototype);
Rox.Asteroid.prototype.constructor = Rox.Asteroid;

Rox.Asteroid.prototype.update = function () {

    //  Happens AFTER the State update
    this.game.world.wrap(this, 16);

}

Rox.Asteroid.prototype.zero = function () {
}



Rox.Game = function (game) {

	this.player;

	this.cursors;
	this.fireButton;

};

Rox.Game.prototype = {

	create: function () {

		this.player = new Rox.Player(this.game, 200, 200);

		var bg = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');

		// this.add.existing(new Rox.Asteroid(this.game, 100, 100));

		this.add.existing(this.player.trail);
		this.add.existing(this.player.bullets);
		this.add.existing(this.player.muzzle);
		this.add.existing(this.player);

		//	Still think maybe this ought to be inside the Player class
		this.cursors = this.input.keyboard.createCursorKeys();
		this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		this.world.sendToBack(bg);

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

	},

    gameOver: function () {
    },

	quitGame: function () {

		this.state.start('MainMenu');

	}

};
