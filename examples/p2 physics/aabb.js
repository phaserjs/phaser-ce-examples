
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('atari', 'assets/sprites/atari130xe.png');
    game.load.image('sky', 'assets/skies/sunset.png');

}

var sprite;
var debugRect;
var overlapRect;
var cursors;
var text;
var mpxi = function (x) { return x };

function create() {

    debugRect = new Phaser.Rectangle();
    overlapRect = new Phaser.Rectangle(400, 300, 90, 64);

    game.add.image(0, 0, 'sky');

    //  Enable p2 physics
    game.physics.startSystem(Phaser.Physics.P2JS);

    //  Map the meters to pixels conversion function to our local var
    mpxi = game.physics.p2.mpxi;

    //  Make things a bit more bouncey
    game.physics.p2.defaultRestitution = 0.8;

    //  Add a sprite
    sprite = game.add.sprite(200, 200, 'atari');

    //  Enable if for physics. This creates a default rectangular body.
    game.physics.p2.enable(sprite);

    //  Modify a few body properties
    sprite.body.setZeroDamping();
    sprite.body.fixedRotation = true;

    text = game.add.text(20, 20, 'move with arrow keys', { fill: '#ffffff' });

    cursors = game.input.keyboard.createCursorKeys();

}

function update() {

    sprite.body.setZeroVelocity();

    if (cursors.left.isDown)
    {
        sprite.body.moveLeft(400);
    }
    else if (cursors.right.isDown)
    {
        sprite.body.moveRight(400);
    }

    if (cursors.up.isDown)
    {
        sprite.body.moveUp(400);
    }
    else if (cursors.down.isDown)
    {
        sprite.body.moveDown(400);
    }

    if (debugRect.intersects(overlapRect))
    {
        text.text = 'Overlapping';
    }
    else
    {
        text.text = 'move with arrow keys';
    }

}

function render() {

    var bodyAABB = sprite.body.data.aabb;

    debugRect.x = mpxi(bodyAABB.upperBound[0]);
    debugRect.y = mpxi(bodyAABB.upperBound[1]);
    debugRect.right = mpxi(bodyAABB.lowerBound[0]);
    debugRect.bottom = mpxi(bodyAABB.lowerBound[1]);

    game.debug.geom(debugRect);
    game.debug.geom(overlapRect);

}

