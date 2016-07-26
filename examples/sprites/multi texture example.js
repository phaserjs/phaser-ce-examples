
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('mushroom', 'assets/sprites/mushroom2.png');
    game.load.image('clown', 'assets/sprites/clown.png');
    game.load.image('beball', 'assets/sprites/beball1.png');
    game.load.image('coke', 'assets/sprites/cokecan.png');
    game.load.image('asuna', 'assets/sprites/asuna_by_vali233.png');
    game.load.image('bsquad', 'assets/sprites/bsquadron3.png');

}

function create() {

    var keys = ['mushroom', 'clown', 'beball', 'coke', 'asuna', 'bsquad'];

    var group = game.add.group();

    //  Here we create 48 sprites, each one using a different texture.
    //  The sprites are interleaved, meaning the WebGL batch will flush
    //  between every single sprite when just 1 texture is used.

    for (var i = 0; i < 6 * 8; i++)
    {
        group.create(0, 0, keys[i % 6]);
    }

    group.align(12, -1, 64, 140, Phaser.CENTER);

    game.renderer.setTexturePriority(keys);

}
