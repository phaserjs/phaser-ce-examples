
//var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('ball', 'assets/sprites/spinObj_01.png');

}

var ball;
var texture;

function create() {

    ball = game.make.sprite(0, 0, 'ball');

    texture = game.add.renderTexture(256, 256);

    texture.renderXY(ball, 0, 0, false);
    texture.renderXY(ball, 50, 50, false);
    texture.renderXY(ball, 100, 100, false);

    game.cache.addImage('tsTexture', '', texture.getImage());

    var ts = game.add.tileSprite(0, 0, 800, 600, 'tsTexture');

    ts.textureDebug = true;

}

function update() {

}
