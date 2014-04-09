game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'phaser-example', {
    preload: preload,
    create: create
});

function preload() {

    game.load.image('grass_tile', 'wip/gt_7.png');

}

var randomInt;
var posY;
var x;
var y;
var TILE_SIZE_WIDTH = 64;
var TILE_SIZE_HEIGHT = 32;
var TILE_OFFSET_MODULO = -TILE_SIZE_WIDTH / 2;
var TILE_MAP_WIDTH_TILES_COUNT = 30;
var TILE_MAP_HEIGHT_TILES_COUNT = 30;
var TILE_MAP_OFFSET_Y = 200;
var group;

function create() {

    for (var i = 0; i < 900; i++)
    {
        game.add.sprite(game.world.randomX, game.world.randomY, 'grass_tile');
    }

    /*
    group = GAME.add.group();
    for (y = 0; y < TILE_MAP_HEIGHT_TILES_COUNT; y++) {
        for (x = 0; x < TILE_MAP_WIDTH_TILES_COUNT; x++) {

            // Create some random noise, so the ground doesn't look leveled
            randomInt = ((Math.random() * 4) + 0) | 0;
            if (randomInt % 2) {
                randomInt = -randomInt;
            }

            posY = TILE_MAP_OFFSET_Y + (y * TILE_SIZE_HEIGHT / 2) + randomInt | 0;
            if (y % 2 === 0) {
                group.create((x * TILE_SIZE_WIDTH), posY, 'grass_tile');
            } else {
                group.create(TILE_OFFSET_MODULO + (x * TILE_SIZE_WIDTH), posY, 'grass_tile');
            }

        }
    }
    */



}