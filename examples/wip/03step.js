
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('pic', 'assets/pics/dr_death-e605-endpart.png');

}

function create() {

    game._dd = 0;

    var sprite = game.add.sprite(0, 0, 'pic');

    sprite.name = 'debug';

}
