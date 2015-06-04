var MyGame = {};

MyGame.StateA = function (game) {

    this.sprite;
    this.cursors;

};

MyGame.StateA.prototype = {

    preload: function () {

        this.load.image('atari', 'assets/sprites/atari130xe.png');
        this.load.image('mushroom', 'assets/sprites/mushroom.png');

    },

    create: function () {

        this.physics.startSystem(Phaser.Physics.BOX2D);

        this.sprite = this.add.sprite(200, 200, 'atari');
        this.physics.box2d.enable(this.sprite);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.input.onDown.add(this.changeState, this);

    },

    update: function () {

        this.sprite.body.setZeroVelocity();

        if (this.cursors.left.isDown)
        {
            this.sprite.body.moveLeft(400);
        }
        else if (this.cursors.right.isDown)
        {
            this.sprite.body.moveRight(400);
        }

        if (this.cursors.up.isDown)
        {
            this.sprite.body.moveUp(400);
        }
        else if (this.cursors.down.isDown)
        {
            this.sprite.body.moveDown(400);
        }

    },

    changeState: function () {

        this.state.start('StateB');

    }

};

MyGame.StateB = function (game) {

    this.sprite;
    this.cursors;

};

MyGame.StateB.prototype = {

    create: function () {

        this.sprite = this.add.sprite(200, 200, 'mushroom');
        this.physics.box2d.enable(this.sprite);
        this.sprite.body.fixedRotation = true;

        this.cursors = this.input.keyboard.createCursorKeys();

    },

    update: function () {

        this.sprite.body.setZeroVelocity();

        if (this.cursors.left.isDown)
        {
            this.sprite.body.moveLeft(400);
        }
        else if (this.cursors.right.isDown)
        {
            this.sprite.body.moveRight(400);
        }

        if (this.cursors.up.isDown)
        {
            this.sprite.body.moveUp(400);
        }
        else if (this.cursors.down.isDown)
        {
            this.sprite.body.moveDown(400);
        }

    }

};

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example');

game.state.add('StateA', MyGame.StateA);
game.state.add('StateB', MyGame.StateB);

game.state.start('StateA');
