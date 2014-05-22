
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });
// var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.spritesheet('mummy', 'assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);

}

var sprite;

function create() {

    // game.stage.backgroundColor = '#39f37e';
    // game.stage.backgroundColor = 0x46f499;
    // game.stage.backgroundColor = '#46f499';

    game.stage.backgroundColor = '#770';
    // game.stage.backgroundColor = 0xffaa33;

    sprite = game.add.sprite(100, 100, 'mummy');
    sprite.animations.add('walk');
    sprite.animations.play('walk', 20, true);

}
