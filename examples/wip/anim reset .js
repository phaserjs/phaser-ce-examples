
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.spritesheet('mummy', 'assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);

}

var sprite;

function create() {

    sprite = game.add.sprite(0, 0, 'mummy');
    sprite.animations.add('walk');
    sprite.animations.play('walk', 20, true);

    game.input.onDown.add(resetSprite, this);

}

function resetSprite() {

    sprite.reset(200, 200);

    sprite.animations.play('walk', 20, true);

}
