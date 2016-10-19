
var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('einstein', 'assets/pics/ra_einstein.png');

}

var image;

function create() {

    image = game.add.image(100, 0, 'einstein', null, game.stage);

}
