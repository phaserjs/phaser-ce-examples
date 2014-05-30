var cfg = {

    width: "100%",
    height: "100%",
    renderer: Phaser.CANVAS,
    state: { preload: preload, create: create, update: update, render: render },

}

var game = new Phaser.Game(cfg);

var tilesprite;

function preload() {

    game.load.image('starfield', '/phaser-examples/examples/assets/misc/starfield.jpg');

}

function create() {

    // tilesprite = game.add.tileSprite(0, 0, game.width, game.height, 'starfield');
    tilesprite = game.add.tileSprite(0, 0, 512, 512, 'starfield');

    game.add.image(600, 0, 'starfield');

}

function update() {

    tilesprite.tilePosition.x += 8;

}

function render() {

    game.debug.text('boo?', 32, 100);

}

