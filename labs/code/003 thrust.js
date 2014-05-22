
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('stars', 'assets/misc/starfield.jpg');
    game.load.image('ship', 'assets/sprites/thrust_ship2.png');
    game.load.image('jets', 'assets/sprites/jets.png');

}

var ship;
var starfield;
var trail;
var isThrusting = false;
var cursors;

function create() {

    game.world.setBounds(0, 0, 1920, 1200);

    starfield = game.add.tileSprite(0, 0, 800, 600, 'stars');
    starfield.fixedToCamera = true;

    //  The trail following the player
    trail = game.add.emitter(0, 0, 1000);
    trail.makeParticles('jets');
    trail.setRotation(0, 0);
    trail.gravity = 0;
    trail.setAlpha(1, 0, 6000);
    trail.setScale(1, 0, 1, 0, 6000);

    isThrusting = false;

    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.restitution = 0.8;

    ship = game.add.sprite(200, 200, 'ship');

    game.physics.p2.enable(ship);

    game.camera.follow(ship);

    cursors = game.input.keyboard.createCursorKeys();

}

function update() {

    isThrusting = false;

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
        isThrusting = true;
    }
    else if (cursors.down.isDown)
    {
        ship.body.reverse(400);
    }

    if (!game.camera.atLimit.x)
    {
        starfield.tilePosition.x += (ship.body.velocity.x * 16) * game.time.physicsElapsed;
    }

    if (!game.camera.atLimit.y)
    {
        starfield.tilePosition.y += (ship.body.velocity.y * 16) * game.time.physicsElapsed;
    }

    trail.emitX = ship.x;
    trail.emitY = ship.y;

    var px = ship.body.velocity.x * 10;
    var py = ship.body.velocity.y * 10;

    px *= -1;
    py *= -1;

    trail.minParticleSpeed.set(px, py);
    trail.maxParticleSpeed.set(px, py);

    if (isThrusting || Math.sqrt(ship.body.velocity.x * ship.body.velocity.x + ship.body.velocity.y * ship.body.velocity.y) > 10)
    {
        trail.start(true, 3000, 8);
    }

}

function render() {

    // game.debug.text(ship.body.velocity.x * 10, 32, 32);
    // game.debug.text(ship.body.velocity.y * 10, 32, 48);

}