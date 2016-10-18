
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('einstein', 'assets/pics/ra_einstein.png');

}

function create() {

    game.add.image(0, 0, 'einstein', 0, game.stage);

}
