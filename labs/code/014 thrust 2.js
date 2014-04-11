
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

	game.load.image('level2', 'assets/physics/thrust-level2.png');

    game.load.image('ship', 'assets/sprites/thrust_ship2.png');

	game.load.physics('physicsData', 'assets/physics/thrust-level2.json');

}

var ship;
var level;
var cursors;

function create() {

    game.world.setBounds(0, 0, 928, 940);

    game.physics.startSystem(Phaser.Physics.P2JS);

    game.physics.p2.restitution = 0.8;

    game.physics.p2.gravity.y = 50;

    //	928 x 640 (+300 padding, 940)
	level = game.add.sprite(464, 300 + 320, 'level2');
	game.physics.p2.enable(level, false);
	level.body.clearShapes();
	level.body.loadPolygon('physicsData', 'thrustmap');
	level.body.static = true;

    ship = game.add.sprite(200, 100, 'ship');
    game.physics.p2.enable(ship, true);
    game.camera.follow(ship);
    cursors = game.input.keyboard.createCursorKeys();

}

function update() {

    if (cursors.left.isDown)
    {
        ship.body.rotateLeft(100);
    }
    else if (cursors.right.isDown)
    {
        ship.body.rotateRight(100);
    }
    else
    {
        ship.body.setZeroRotation();
    }

    if (cursors.up.isDown)
    {
        ship.body.thrust(400);
    }
    else if (cursors.down.isDown)
    {
        ship.body.reverse(400);
    }

}

function render() {

}
