
// var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('diver', 'assets/sprites/treasure_trap.png');

}

var sprite;
var texture;

function create() {

    texture = game.add.renderTexture(game.width, game.height);
    game.add.sprite(0, 0, texture);

    sprite = game.add.sprite(127, 143, 'diver');
    sprite.anchor.set(0.5);

    game.add.tween(sprite.scale).to( { x: 0.2, y: 0.2 }, 2000, "Sine.easeInOut", true, 500, -1, true);

    game.input.onDown.add(drawSprite, this);

    game.add.text(32, 32, 'Click to draw Sprite', { font: "24px Arial", fill: "#ffffff" });

}

function drawSprite() {

    texture.render(sprite);

}

function update() {

    sprite.rotation += 0.01;

    sprite.x = game.input.activePointer.x;
    sprite.y = game.input.activePointer.y;

}
