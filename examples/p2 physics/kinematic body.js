
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('wizball', 'assets/sprites/wizball.png');
    game.load.image('atari', 'assets/sprites/atari130xe.png');
	game.load.image('sky', 'assets/skies/sunset.png');

}

var static1;
var static2;
var sprite;
var cursors;

function create() {

    game.world.setBounds(0, 0, 1600, 1200);

    game.add.image(0, 0, 'sky');

	//	Enable p2 physics
	game.physics.startSystem(Phaser.Physics.P2JS);

    //  Make things a bit more bouncey
    game.physics.p2.restitution = 0.8;

    //  Add a sprite
	sprite = game.add.sprite(400, 300, 'wizball');
    game.physics.p2.enable(sprite);
    sprite.body.setCircle(44);

    //  Create two kinematic objects
    kinematic1 = game.add.sprite(200, 200, 'atari');
    kinematic2 = game.add.sprite(500, 500, 'atari');

    //  Enable if for physics. This creates a default rectangular body.
    game.physics.p2.enable( [ kinematic1, kinematic2 ]);

    //  Make kinematic - Kinematic means that the body will not be effected by 
    //  physics such as gravity and collisions, but can still move and 
    //  will fire collision events
    kinematic1.body.kinematic = true;
	kinematic2.body.kinematic = true;

    //  Give the kinematic objects some velocity
    kinematic1.body.velocity.x = 10;
    kinematic2.body.velocity.x = -10;

    text = game.add.text(20, 20, 'move with arrow keys', { fill: '#ffffff' });

    cursors = game.input.keyboard.createCursorKeys();

    //  Change the directions of the kinematic objects after 20 seconds
    game.time.events.loop(Phaser.Timer.SECOND * 20, switchDirections, this);

}

function update() {

    if (cursors.left.isDown)
    {
    	sprite.body.rotateLeft(80);
    }
    else if (cursors.right.isDown)
    {
    	sprite.body.rotateRight(80);
    }
    else
    {
        sprite.body.setZeroRotation();
    }

    if (cursors.up.isDown)
    {
    	sprite.body.thrust(400);
    }
    else if (cursors.down.isDown)
    {
    	sprite.body.reverse(400);
    }

}

function switchDirections() {

    //  This simply flips the directions of the kinematic objects. The P2 mpxi function
    //  is used to convert from the p2 physics value back into pxiels.
    kinematic1.body.velocity.x = game.physics.p2.mpxi(kinematic1.body.velocity.x) * -1;
    kinematic2.body.velocity.x = game.physics.p2.mpxi(kinematic2.body.velocity.x) * -1;

}
