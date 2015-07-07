
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.tilemap('level3', 'assets/tilemaps/maps/cybernoid.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/tilemaps/tiles/cybernoid.png', 16, 16);

}

var map;
var layer;
var cursors;

function create() {

    map = game.add.tilemap('level3');

    map.addTilesetImage('CybernoidMap3BG_bank.png', 'tiles');

    //  Start with a small layer only 400x200 and increase it by 100px
    //  each time we click
    layer = map.createLayer(0, 400, 200);

    layer.resizeWorld();

    cursors = game.input.keyboard.createCursorKeys();

    game.input.onDown.add(resize, this);

}

function resize() {

    // 400,500,600,700,800
    // 200,300,400,500,600

    if (layer.width < 800)
    {
        var w = layer.width + 100;
        var h = layer.height + 100;
        layer.resize(w, h);
    }

}

function update() {

    if (cursors.up.isDown)
    {
        game.camera.y--;
    }
    else if (cursors.down.isDown)
    {
        game.camera.y++;
    }

    if (cursors.left.isDown)
    {
        game.camera.x--;
    }
    else if (cursors.right.isDown)
    {
        game.camera.x++;
    }

}
