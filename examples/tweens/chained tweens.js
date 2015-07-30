
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('kirito', 'assets/sprites/kirito_by_vali233.png');
    game.load.image('asuna', 'assets/sprites/asuna_by_vali233.png');

}

var text;
var tweenA;
var tweenB;

function create() {

    game.renderer.renderSession.roundPixels = true;
    game.stage.backgroundColor = '#124184';

    game.add.text(16, 16, "Tween Chain Demo", { font: "16px Arial", fill: "#ffffff" });
    text = game.add.text(680, 16, "Click to Start", { font: "16px Arial", fill: "#ffffff" });

    var spriteA = game.add.sprite(64, 100, 'kirito');
    var spriteB = game.add.sprite(64, 300, 'asuna');

    tweenA = game.add.tween(spriteA).to( { x: 600 }, 2000, "Quart.easeOut");
    tweenB = game.add.tween(spriteB).to( { x: 600 }, 2000, "Quart.easeOut");

    tweenA.chain(tweenB);

    game.input.onDown.addOnce(start, this);

}

function start() {

    tweenA.start();

    text.visible = false;

}
