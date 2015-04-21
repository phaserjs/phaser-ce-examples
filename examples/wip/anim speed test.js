
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.spritesheet('mummy', 'assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);

}

function create() {

    for (var i = 0; i < 10; i++)
    {
        var mummy = game.add.sprite(48 * i, 100, 'mummy');
        mummy.animations.add('walk');
        mummy.animations.play('walk', 10 + i, true);
    }

}
