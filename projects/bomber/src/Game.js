
Bomber.Game = function (game) {

    this.land;
    this.cities;
    this.plane;
    this.bomb;
    this.score;
    this.scoreText;

    this.emitter;
    this.gameLost;
    this.gameWon;
    this.speed;
    this.droppedThisRun;
    this.heights;

};

Bomber.Game.prototype = {

	create: function () {

        this.cities = [];
        this.heights = [ 2, 3, 3, 3, 4, 4, 5, 5, 5, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 9, 10, 10, 10, 12, 14, 14 ];
        this.gameLost = false;
        this.gameWon = false;
        this.speed = 100;
        this.droppedThisRun = false;

        this.stage.smoothed = false;

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.add.image(0, 0, 'sky');

        this.land = this.add.sprite(0, 336, 'land');

        this.bomb = this.add.sprite(0, 0, 'bomb');
        this.bomb.visible = false;

        this.plane = this.add.sprite(-21, 16, 'plane');
        this.plane.anchor.set(0.5, 0);
        this.plane.checkWorldBounds = true;
        this.plane.events.onOutOfBounds.add(this.planeLeft, this);

        this.physics.arcade.enable( [ this.plane, this.bomb, this.land ] );

        this.plane.body.allowGravity = false;
        this.plane.body.velocity.x = 100;

        this.bomb.checkWorldBounds = true;

        this.heights = Phaser.Utils.shuffle(this.heights);

        for (var i = 0; i < this.heights.length; i++)
        {
            this.cities.push(new Bomber.City(this.game, 48 + i * 16, this.heights[i]));
        }

        this.emitter = this.add.emitter(0, 0, 500);

        this.physics.arcade.bounds.setTo(0, 0, this.game.world.width, 336);
        this.physics.arcade.checkCollision = { up: false, down: true, left: false, right: false };

        this.emitter.makeParticles('particles', [0,1,2,3,4], 500, true, true);
        this.emitter.gravity = 200;
        this.emitter.bounce.set(0.25);
        this.emitter.setXSpeed(-200, 200);
        this.emitter.setYSpeed(-50, 50);

        this.score = 0;
        this.scoreText = this.add.bitmapText(8, 360, 'rollingThunder', 'score: 0', 16);

        this.add.image(390, 360, 'photonstorm');

        this.input.onDown.add(this.dropBomb, this);

	},

    planeLeft: function () {

        if (this.gameWon)
        {
            this.plane.body.velocity.x = 0;

            if (this.plane.body.facing === Phaser.LEFT)
            {
                this.plane.scale.x = 1;
            }
            else
            {
                this.plane.scale.x = -1;
            }

            var tween = this.add.tween(this.plane).to( { x: 256, y: 320 }, 2000, Phaser.Easing.Cubic.Out, true);
            tween.onComplete.add(this.gameOver, this);
        }
        else
        {
            this.speed += 1;
            this.plane.y += 4;
            this.droppedThisRun = false;

            if (this.plane.body.facing === Phaser.LEFT)
            {
                this.plane.scale.x = 1;
                this.plane.body.velocity.x = this.speed;
            }
            else
            {
                this.plane.scale.x = -1;
                this.plane.body.velocity.x = -this.speed;
            }
        }

    },

    dropBomb: function () {

        if (this.droppedThisRun)
        {
            return;
        }

        this.droppedThisRun = true;

        this.bomb.x = this.game.math.snapToFloor(this.plane.x, 16) + 2;
        this.bomb.y = this.plane.y + 8;
        this.bomb.body.gravity.y = 200;
        this.bomb.body.velocity.y = 100;
        this.bomb.visible = true;

    },

    removeBomb: function () {

        this.bomb.reset(0, 0);
        this.bomb.body.gravity.y = 0;
        this.bomb.body.velocity.y = 0;
        this.bomb.visible = false;

    },

	update: function () {

        this.scoreText.text = 'score:' + this.score;

        if (this.gameLost || this.gameWon)
        {
            return;
        }

        for (var i = 0; i < this.cities.length; i++)
        {
            if (this.cities[i].alive)
            {
                this.physics.arcade.overlap(this.plane, this.cities[i].top, this.planeSmash, null, this);
            }
        }

        if (this.bomb.visible)
        {
            for (var i = 0; i < this.cities.length; i++)
            {
                if (this.cities[i].alive)
                {
                    this.physics.arcade.overlap(this.bomb, this.cities[i].top, this.cities[i].hit, null, this.cities[i]);
                }
            }

            this.physics.arcade.overlap(this.bomb, this.land, this.removeBomb, null, this);
        }

	},

    planeSmash: function () {

        this.gameLost = true;

        this.plane.body.velocity.x = 0;

        this.emitter.x = this.plane.x;
        this.emitter.y = this.plane.y;
        this.emitter.start(true, 2000, null, 64);

        var tween = this.add.tween(this.plane).to( { y: 320 }, 2000, Phaser.Easing.Exponential.In, true);
        tween.onComplete.add(this.gameOver, this);

        this.input.onDown.remove(this.dropBomb, this);

    },

    deadCities: function () {

        for (var i = 0; i < this.cities.length; i++)
        {
            if (this.cities[i].alive)
            {
                return;
            }
        }

        //  Got this far? Then they're all dead Jim ...
        this.gameWon = true;
        this.input.onDown.remove(this.dropBomb, this);

    },

    gameOver: function () {

        if (this.gameWon)
        {
            var t = this.add.bitmapText(0, 128, 'rollingThunder', 'GAME WON', 32);
        }
        else
        {
            var t = this.add.bitmapText(0, 64, 'rollingThunder', 'GAME LOST', 32);
        }

        t.x = 256 - (t.textWidth / 2);

        this.input.onDown.add(this.quitGame, this);

    },

	quitGame: function () {

		this.state.start('MainMenu');

	}

};
