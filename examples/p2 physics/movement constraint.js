
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('ball', 'assets/sprites/blue_ball.png');
    game.load.image('background', 'assets/games/starstruck/background2.png');
    game.load.spritesheet('dude', 'assets/games/starstruck/dude.png', 32, 48);

}

var sprite1;
var player;
var cursors;

function create() {

    bg = game.add.tileSprite(0, 0, 800, 600, 'background');

	//	Enable p2 physics
	game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 200;

    //  Add 2 sprites which we'll join with a spring

    player = game.add.sprite(200, 400, 'dude');
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('turn', [4], 20, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    //  Enable if for physics. This creates a default rectangular body.
    game.physics.p2.enable(player);
    
    player.body.fixedRotation = true;

	sprite2 = game.add.sprite(400, 400, 'ball');

	game.physics.p2.enable(sprite2);
    sprite2.body.fixedRotation = true;

    //  Lock the two bodies together. The [0, 50] sets the distance apart (y: 80)
    var constraint = game.physics.p2.createLockConstraint(sprite2, player, [0, 50], 80);

    cursors = game.input.keyboard.createCursorKeys();

}

function update() {

	sprite2.body.setZeroVelocity();

    if (cursors.left.isDown)
    {
    	sprite2.body.moveLeft(400);
    }
    else if (cursors.right.isDown)
    {
    	sprite2.body.moveRight(400);
    }

    if (cursors.up.isDown)
    {
        sprite2.body.moveUp(400);
    }
    else if (cursors.down.isDown)
    {
        sprite2.body.moveDown(400);
    }

}

