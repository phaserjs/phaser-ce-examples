
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('stars', 'assets/misc/starfield.jpg');
    game.load.spritesheet('ship', 'assets/sprites/humstar.png', 32, 32);

}

var ship;
var starfield;
var cursors;

function create() {

    //  Our world size is 1600 x 1200 pixels
    game.world.setBounds(0, 0, 1600, 1200);

    //  Enable P2 and it will use the updated world size
    game.physics.startSystem(Phaser.Physics.P2JS);

    starfield = game.add.tileSprite(0, 0, 800, 600, 'stars');
    starfield.fixedToCamera = true;

	ship = game.add.sprite(200, 200, 'ship');
    ship.scale.set(2);
    ship.smoothed = false;
    ship.animations.add('fly', [0,1,2,3,4,5], 10, true);
    ship.play('fly');

    //  Create our physics body. The 'true' parameter enables visual debugging.
	game.physics.p2.enable(ship, true);

    //  Alternatively create a circle for the ship instead (which more accurately matches its size)
    // ship.body.setCircle(28);

	game.camera.follow(ship);

    cursors = game.input.keyboard.createCursorKeys();

}

function update() {

    ship.body.setZeroVelocity();

    if (cursors.left.isDown)
    {
		ship.body.moveLeft(200);
    }
    else if (cursors.right.isDown)
    {
		ship.body.moveRight(200);
    }

    if (cursors.up.isDown)
    {
    	ship.body.moveUp(200);
    }
    else if (cursors.down.isDown)
    {
        ship.body.moveDown(200);
    }

    if (!game.camera.atLimit.x)
    {
        starfield.tilePosition.x -= ((ship.body.velocity.x) * game.time.physicsElapsed);
    }

    if (!game.camera.atLimit.y)
    {
        starfield.tilePosition.y -= ((ship.body.velocity.y) * game.time.physicsElapsed);
    }

}
