
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.spritesheet('coin', 'assets/sprites/coin.png', 32, 32);

}

var coins;

function create() {

    //  Here we create our coins group
    coins = game.add.group();

    //  Now let's add 50 coins into it
    for (var i = 0; i < 50; i++)
    {
        coins.create(game.world.randomX / 2, game.world.randomY / 2, 'coin', 0);
    }

    //  And now we scale it: x2 on the x and y axis
    coins.scale.set(2, 2);

}
