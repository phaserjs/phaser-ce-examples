var PewPew = {

    //  Our global Sprite, shared between States
    spaceship: null

};

PewPew.Preloader = function () {};

PewPew.Preloader.prototype = {

    preload: function () {

        this.load.image('chunk', 'assets/sprites/chunk.png');
        this.load.image('arrow', 'assets/sprites/asteroids_ship.png');

    },

    create: function () {

        PewPew.spaceship = this.make.sprite(32, 450, 'arrow');
        PewPew.spaceship.anchor.set(0.5);

        this.physics.arcade.enable(PewPew.spaceship);

        PewPew.spaceship.body.collideWorldBounds = true;
        PewPew.spaceship.body.bounce.set(0.8);

        this.game.state.start('State1');

    }

};

PewPew.State1 = function (game) {};

PewPew.State1.prototype = {

    create: function () {

        this.stage.backgroundColor = '#124184';

        //  If the spaceship is already in the World we don't add it again
        if (!PewPew.spaceship.parent)
        {
            this.add.existing(PewPew.spaceship);
        }

        this.launch();

        this.input.onDown.addOnce(this.changeState, this);

    },

    launch: function () {

        if (this.input.x < PewPew.spaceship.x)
        {
            PewPew.spaceship.body.velocity.setTo(-200, -200);
        }
        else
        {
            PewPew.spaceship.body.velocity.setTo(200, -200);
        }

    },

    update: function () {

        PewPew.spaceship.rotation = PewPew.spaceship.body.angle;

    },

    changeState: function () {

        this.game.state.start('State2', false, false);

    }

};

PewPew.State2 = function (game) {};

PewPew.State2.prototype = {

    create: function () {

        this.stage.backgroundColor = '#844112';

        //  If the spaceship is already in the World we don't add it again
        if (!PewPew.spaceship.parent)
        {
            this.add.existing(PewPew.spaceship);
        }

        this.input.onDown.addOnce(this.changeState, this);

    },

    update: function () {

        PewPew.spaceship.rotation = PewPew.spaceship.body.angle;

    },

    changeState: function () {

        this.game.state.start('State1', false, false);

    }

};

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example');

game.state.add('Preloader', PewPew.Preloader);
game.state.add('State1', PewPew.State1);
game.state.add('State2', PewPew.State2);

game.state.start('Preloader');
