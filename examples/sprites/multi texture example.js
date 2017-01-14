
var game = new Phaser.Game(800, 600, Phaser.WEBGL_MULTI, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('mushroom', 'assets/sprites/mushroom2.png');
    game.load.image('clown', 'assets/sprites/clown.png');
    game.load.image('beball', 'assets/sprites/beball1.png');
    game.load.image('coke', 'assets/sprites/cokecan.png');
    game.load.image('asuna', 'assets/sprites/asuna_by_vali233.png');
    game.load.image('bikkuriman', 'assets/sprites/bikkuriman.png');
    game.load.image('bsquad1', 'assets/sprites/bsquadron1.png');
    game.load.image('bsquad2', 'assets/sprites/bsquadron2.png');
    game.load.image('bsquad3', 'assets/sprites/bsquadron3.png');
    game.load.image('car', 'assets/sprites/car.png');
    game.load.image('carrot', 'assets/sprites/carrot.png');
    game.load.image('duck', 'assets/sprites/darkwing_crazy.png');
    game.load.image('diamond', 'assets/sprites/diamond.png');
    game.load.image('eggplant', 'assets/sprites/eggplant.png');
    game.load.image('firstaid', 'assets/sprites/firstaid.png');
    game.load.image('chick', 'assets/sprites/budbrain_chick.png');
    game.load.image('bullet', 'assets/sprites/bullet.png');
    game.load.image('bunny', 'assets/sprites/bunny.png');
    game.load.image('chick', 'assets/sprites/chick.png');
    game.load.image('chunk', 'assets/sprites/chunk.png');
    game.load.image('enemy', 'assets/sprites/enemy-bullet.png');
    game.load.image('spaceman', 'assets/sprites/exocet_spaceman.png');
    game.load.image('green_ball', 'assets/sprites/green_ball.png');
    game.load.image('ilkke', 'assets/sprites/ilkke.png');
    game.load.image('jets', 'assets/sprites/jets.png');
    game.load.image('kirito', 'assets/sprites/kirito_by_vali233.png');
    game.load.image('lemming', 'assets/sprites/lemming.png');
    game.load.image('loop', 'assets/sprites/loop.png');
    game.load.image('maggot', 'assets/sprites/maggot.png');
    game.load.image('master', 'assets/sprites/master.png');

}

function create() {

    game.renderer.renderSession.roundPixels = true;

    var keys = ['mushroom', 'clown', 'beball', 'coke', 'asuna', 
    'bikkuriman', 'bsquad1', 'bsquad2', 'bsquad3', 'car', 
    'carrot', 'duck', 'diamond', 'eggplant', 'firstaid'];

    var group = game.add.group();

    //  Here we create just 210 sprites, each one using one of 15 different textures.
    //  The sprites are interleaved, meaning the WebGL batch will flush
    //  between every single sprite, because each one uses a different base texture.

    for (var i = 0; i < 15 * 14; i++)
    {
        var sprite = group.create(0, 0, keys[i % 15]);
        sprite.smoothed = false;
    }

    console.log(group.total);

    group.align(16, -1, 50, 44, Phaser.CENTER);

    //  Using just one single GPU texture (the default) the above scene, with just
    //  210 sprites, will require 212 WebGL draw operations and a massive 1489 WebGL calls.

    //  And using multiple GPU textures ...
    var enabled = game.renderer.setTexturePriority(keys);

    //  So we can see which textures were batched (varies per GPU)
    console.log(enabled);

    //  The whole scene takes just 2 draw operations, one of which is clearing the screen,
    //  and just 17 operations in total. The performance difference is staggering.

}
