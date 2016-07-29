
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

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

    var keys = game.cache.getKeys();

    var group = game.add.group();

    for (var i = 0; i < 200; i++)
    {
        var sprite = group.create(game.world.randomX, game.world.randomY, keys[i % keys.length]);
    }

    //  104 draws, 937 calls with
    //  202 draws, 1821 calls without - so exactly 50% saving

    game.renderer.setTexturePriority(keys);

}
