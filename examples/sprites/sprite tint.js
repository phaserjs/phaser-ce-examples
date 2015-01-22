
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.atlas('atlas', 'assets/sprites/seacreatures_json.png', 'assets/sprites/seacreatures_json.json');

}

var sprite;

function create() {

    sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'atlas', 'greenJellyfish0000');
    sprite.anchor.set(0.5);

    sprite.tint = Math.random() * 0xffffff;

    game.input.onDown.add(changeTint, this);

}

function changeTint() {

    sprite.tint = Math.random() * 0xffffff;

}

function update() {

    sprite.rotation += 0.02;

}
