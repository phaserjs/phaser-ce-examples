
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });
// var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('pic', 'assets/pics/lance-overdose-loader_eye.png');
    game.load.spritesheet('sheet', 'assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);
    game.load.atlas('atlas', 'assets/sprites/seacreatures_json.png', 'assets/sprites/seacreatures_json.json');
    game.load.bitmapFont('desyrel', 'assets/fonts/bitmapFonts/desyrel.png', 'assets/fonts/bitmapFonts/desyrel.xml');

}

function create() {

    game.add.image(0, 0, 'pic');
    game.add.sprite(100, 100, 'sheet', 0);
    game.add.sprite(180, 100, 'sheet', 3);
    game.add.sprite(240, 100, 'sheet', 6);
    // game.add.sprite(300, 300, 'atlas', 0);

    var style = { font: "32px Arial", fill: "#ff0044", align: "center" };
    var text = game.add.text(0, game.world.centerY, "Click to run FrameDebugger", style);

    game.add.bitmapText(200, 100, 'desyrel', 'FrameDebugger', 64);

    game.input.onDown.add(record, this);

}

function record() {

    game.fd.record(4);

}
