
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
        var coin = coins.create(game.world.randomX, game.world.randomY, 'coin', 0);
    }

    coins.setAll('inputEnabled', true);

    //  Now using the power of callAll we can add the same input event to all coins in the group:
    coins.callAll('events.onInputDown.add', 'events.onInputDown', removeCoin);

}

function removeCoin(item) {

    item.alpha = 0.3;

}
