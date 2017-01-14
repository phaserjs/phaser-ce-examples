
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.tilemap('commando', 'assets/tilemaps/maps/commando.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/tilemaps/tiles/commando.png', 32, 32);
    game.load.image('phaser', 'assets/sprites/ship.png');
    game.load.image('chunk', 'assets/sprites/chunk.png');

}

var map;
var layer;
var cursors;
var sprite;
var emitter;

function create() {

    map = game.add.tilemap('commando');
    map.addTilesetImage('CommandoMap1-1BG_bank.png', 'tiles');

    layer = map.createLayer(0);
    layer.resizeWorld();

    cursors = game.input.keyboard.createCursorKeys();

    emitter = game.add.emitter(0, 0, 200);

    emitter.makeParticles('chunk');
    emitter.minRotation = 0;
    emitter.maxRotation = 0;
    emitter.gravity = 150;
    emitter.bounce.setTo(0.5, 0.5);

    sprite = game.add.sprite(240, 0, 'phaser');
    sprite.anchor.set(0.5);

    game.physics.enable(sprite);

    sprite.body.collideWorldBounds = true;

    //  Position the camera at the BOTTOM of the world, we do this by ...

    //  1) Getting the height of the world (as it was set by the tilemap)
    //  2) Subtracting the game height from it

    // game.camera.y = game.world.height - game.height;

    //  Alternatively we can just set the camera to follow the Player sprite
    //  which is at the bottom of the world already

    sprite.y = game.world.height - game.height - 360;

    game.camera.follow(sprite);

}

function particleBurst() {

    emitter.x = sprite.x;
    emitter.y = sprite.y;
    emitter.start(true, 2000, null, 1);

}

function update() {

    sprite.body.velocity.x = 0;
    sprite.body.velocity.y = 0;

    if (cursors.up.isDown)
    {
        sprite.body.velocity.y = -200;
        particleBurst();
    }
    else if (cursors.down.isDown)
    {
        sprite.body.velocity.y = 200;
        particleBurst();
    }

    if (cursors.left.isDown)
    {
        sprite.body.velocity.x = -200;
    }
    else if (cursors.right.isDown)
    {
        sprite.body.velocity.x = 200;
    }

}

function render() {

    // game.debug.body(sprite);

}
