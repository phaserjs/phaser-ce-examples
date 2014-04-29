
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.tilemap('map', 'wip/testing.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'wip/foreboding1.png');

}

function create() {

    var map = game.add.tilemap('map');

    //  In the Tiled JSON file, the tileset name is 'foreboding1'
    //  In Phaser the cache key is 'tiles'

    //  Here is how to pair them up correctly:
    // map.addTilesetImage('foreboding1', 'tiles');

    //  If you don't give the correct Tiled tileset name (as below) you get weird results.
    //  Un-comment it to see.
    map.addTilesetImage('tiles');

    var layer = map.createLayer('Tile Layer 1');

}
