
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.tilemap('map', 'assets/tilemaps/csv/catastrophi_level2.csv', null, Phaser.Tilemap.CSV);
    game.load.image('tiles', 'assets/tilemaps/tiles/catastrophi_tiles_16.png');
    game.load.image('player', 'assets/sprites/tinycar.png');

}

var map;
var layer;
var cursors;
var player;

function create() {

    game.physics.startSystem(Phaser.Physics.P2JS);

    //  Because we're loading CSV map data we have to specify the tile size here or we can't render it
    map = game.add.tilemap('map', 16, 16);

    //  Now add in the tileset
    map.addTilesetImage('tiles');
    
    //  Create our layer
    layer = map.createLayer(0);

    //  Resize the world
    layer.resizeWorld();

    //  This isn't totally accurate, but it'll do for now
    map.setCollisionBetween(54, 83);

    //  Convert the tilemap layer into bodies. Only tiles that collide (see above) are created.
    //  This call returns an array of body objects which you can perform addition actions on if
    //  required. There is also a parameter to control optimising the map build.
    game.physics.p2.convertTilemap(map, layer);

    //  Player
    player = game.add.sprite(48, 48, 'player');

    game.physics.p2.enable(player);

    game.physics.p2.setBoundsToWorld(true, true, true, true, false);

    game.camera.follow(player);

    //  Allow cursors to scroll around the map
    cursors = game.input.keyboard.createCursorKeys();

    var help = game.add.text(16, 16, 'Arrows to move', { font: '14px Arial', fill: '#ffffff' });
    help.fixedToCamera = true;

}

function update() {

    if (cursors.left.isDown)
    {
        player.body.rotateLeft(100);
    }
    else if (cursors.right.isDown)
    {
        player.body.rotateRight(100);
    }
    else
    {
        player.body.setZeroRotation();
    }

    if (cursors.up.isDown)
    {
        player.body.thrust(400);
    }
    else if (cursors.down.isDown)
    {
        player.body.reverse(400);
    }

}

function render() {
}
