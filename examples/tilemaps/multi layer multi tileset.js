
// var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload () {

    game.load.tilemap('map', 'assets/tilemaps/maps/multi-layer-multi-tileset.json', null, Phaser.Tilemap.TILED_JSON);

    game.load.image('platforms', 'assets/tilemaps/tiles/kenny_platformer_64x64.png');
    game.load.image('ground', 'assets/tilemaps/tiles/kenny_ground_64x64.png');
    game.load.image('items', 'assets/tilemaps/tiles/kenny_items_64x64.png');

    game.load.image('arrow', 'assets/sprites/arrow.png');

}

var map;
var sprite;
var cursors;

function create () {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#01555f';

    map = game.add.tilemap('map');

    //  Tilesets must always be added first
    map.addTilesetImage('kenny_platformer_64x64', 'platforms');
    map.addTilesetImage('kenny_ground_64x64', 'ground');
    map.addTilesetImage('kenny_items_64x64', 'items');

    //  Then create the layers
    var layer1 = map.createLayer('Tile Layer 1');
    var layer2 = map.createLayer('Tile Layer 2');
    var layer3 = map.createLayer('Tile Layer 3');

    layer1.resizeWorld();

    sprite = game.add.sprite(260, 100, 'arrow');
    sprite.anchor.set(0.5);
    game.physics.enable(sprite);

    sprite.body.maxAngular = 500;
    sprite.body.angularDrag = 50;

    game.camera.follow(sprite);

    cursors = game.input.keyboard.createCursorKeys();

}

function update () {

    // game.physics.arcade.collide(sprite, layer);

    sprite.body.velocity.x = 0;
    sprite.body.velocity.y = 0;
    sprite.body.angularVelocity = 0;

    if (cursors.left.isDown)
    {
        sprite.body.angularVelocity = -200;
    }
    else if (cursors.right.isDown)
    {
        sprite.body.angularVelocity = 200;
    }

    if (cursors.up.isDown)
    {
        game.physics.arcade.velocityFromAngle(sprite.angle, 400, sprite.body.velocity);
    }

}
