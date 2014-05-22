
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.tilemap('map', 'assets/tilemaps/maps/collision_test.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('ground_1x1', 'assets/tilemaps/tiles/ground_1x1.png');
    game.load.image('phaser', 'assets/sprites/phaser-dude.png');

}

var map;
var layer;
var cursors;
var sprite;

function create() {

    map = game.add.tilemap('map');

    map.addTilesetImage('ground_1x1');
    
    layer = map.createLayer('Tile Layer 1');

    layer.resizeWorld();

    map.setCollisionBetween(1, 12);

    // layer.debug = true;

    sprite = game.add.sprite(260, 70, 'phaser');

    game.physics.enable(sprite);

    sprite.body.bounce.set(0.6);
    sprite.body.tilePadding.set(32);

    game.camera.follow(sprite);

    game.physics.arcade.gravity.y = 200;

    cursors = game.input.keyboard.createCursorKeys();

}

function update() {

    game.physics.arcade.collide(sprite, layer);

    //  Un-comment these to gain full control over the sprite
    // sprite.body.velocity.x = 0;
    // sprite.body.velocity.y = 0;

    if (cursors.up.isDown)
    {
        sprite.body.velocity.y = -150;
    }
    else if (cursors.down.isDown)
    {
        sprite.body.velocity.y = 150;
    }

    if (cursors.left.isDown)
    {
        sprite.body.velocity.x = -150;
    }
    else if (cursors.right.isDown)
    {
        sprite.body.velocity.x = 150;
    }

}

function render() {

    //  Useful debug things you can turn on to see what's happening

    // game.debug.spriteBounds(sprite);
    // game.debug.cameraInfo(game.camera, 32, 32);
    // game.debug.body(sprite);
    game.debug.bodyInfo(sprite, 32, 32);

}
