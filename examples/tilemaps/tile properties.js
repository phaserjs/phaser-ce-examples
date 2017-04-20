
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.tilemap('map', 'assets/tilemaps/maps/tile_properties.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/tilemaps/tiles/gridtiles.png');

}

var map;
var layer;
var marker;

// var sprite;
var cursors;
var currentDataString;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    map = game.add.tilemap('map');

    map.addTilesetImage('tiles');

    // map.setCollisionBetween(1, 12);

    layer = map.createLayer('Tile Layer 1');

    layer.resizeWorld();

    //  Our painting marker
    marker = game.add.graphics();
    marker.lineStyle(2, 0xffffff, 1);
    marker.drawRect(0, 0, 32, 32);

    game.input.addMoveCallback(updateMarker, this);

    game.input.onDown.add(getTileProperties, this);

    cursors = game.input.keyboard.createCursorKeys();

}

function getTileProperties() {

    var x = layer.getTileX(game.input.activePointer.worldX);
    var y = layer.getTileY(game.input.activePointer.worldY);

    var tile = map.getTile(x, y, layer);
    
    // Note: JSON.stringify will convert the object tile properties to a string
    currentDataString = JSON.stringify( tile.properties );

    tile.properties.wibble = true;

}

function updateMarker() {

    marker.x = layer.getTileX(game.input.activePointer.worldX) * 32;
    marker.y = layer.getTileY(game.input.activePointer.worldY) * 32;

}

function update() {

    if (cursors.left.isDown)
    {
        game.camera.x -= 4;
    }
    else if (cursors.right.isDown)
    {
        game.camera.x += 4;
    }

    if (cursors.up.isDown)
    {
        game.camera.y -= 4;
    }
    else if (cursors.down.isDown)
    {
        game.camera.y += 4;
    }

}

function render() {

    if(currentDataString){
        game.debug.text('Tile properties: ' + currentDataString, 16, 550);
    } else {
        game.debug.text("Click on a tile to reveal the properties of the tile", 16, 550);
    }
}
