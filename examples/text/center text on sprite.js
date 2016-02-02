
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('pic', 'assets/pics/fof_background.png');

}

var sprite;
var text;

function create() {

    game.stage.backgroundColor = 0x5d5d5d;

    sprite = game.add.sprite(200, 200, 'pic');
    sprite.inputEnabled = true;
    sprite.input.enableDrag();

    var style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: sprite.width, align: "center", backgroundColor: "#ffff00" };

    text = game.add.text(0, 0, "- text on a sprite -\ndrag me", style);
    text.anchor.set(0.5);

}

function update() {

    text.x = Math.floor(sprite.x + sprite.width / 2);
    text.y = Math.floor(sprite.y + sprite.height / 2);

}