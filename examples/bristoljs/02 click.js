
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload () {

    game.load.image('einstein', 'assets/pics/ra_einstein.png');
    game.load.image('dt', 'assets/bristoljs/dt.jpg');

}

var image;

function create() {

    image = game.add.sprite(game.world.centerX, game.world.centerY, 'einstein');

    image.anchor.set(0.5);

    image.inputEnabled = true;

    image.events.onInputDown.addOnce(onClick, this);

}

function onClick() {

    image.loadTexture('dt');

}
