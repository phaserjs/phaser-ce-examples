
var game = new Phaser.Game("100%", "100%", Phaser.AUTO, '', { preload: preload, create: create, resize: resize });

function preload() {

    game.load.image('einstein', 'assets/pics/ra_einstein.png');

}

var sprite1;
var sprite2;

function create() {

    game.scale.scaleMode = Phaser.ScaleManager.RESIZE;

    sprite1 = game.add.sprite(0, 0, 'einstein');

    sprite2 = game.add.sprite(game.width, game.height, 'einstein');
    sprite2.anchor.set(1, 1);

}

function resize(width, height) {

    sprite2.x = width;
    sprite2.y = height;

}
