
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.spritesheet('coin', 'assets/sprites/coin.png', 32, 32);

}

var coins;

function create() {

    //  Here we create our coins group
    coins = game.add.group();

    //  Now let's add 50 coins into it
    for (var i = 0; i < 2500; i++)
    {
        coins.create(game.world.randomX, game.world.randomY, 'coin', 0);
    }

    //  Now using the power of callAll we can add the same animation to all coins in the group:

    var t = Date.now();

    // coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
    for (var i = 0; i < 2500; i++)
    {
        coins.children[i].animations.add('spin', [5, 4, 3, 2, 1, 0], 10, true);
        // coins.children[i].animations.add('spin2', [5, 4, 3, 2, 1, 0], 10, true);
        // coins.children[i].animations.add('spin3', [5, 4, 3, 2, 1, 0], 10, true);
        // coins.children[i].animations.add('spin4', [5, 4, 3, 2, 1, 0], 10, true);
        // coins.children[i].animations.add('spin5', [5, 4, 3, 2, 1, 0], 10, true);
    }

    console.log('step 1', Date.now() - t);
    t = Date.now();

    // coins.callAll('animations.add', 'animations', 'spin2', [5, 4, 3, 2, 1, 0], 10, true);
    for (var i = 0; i < 2500; i++)
    {
        coins.children[i].animations.add('spin2', [5, 4, 3, 2, 1, 0], 10, true);
    }

    console.log('step 2', Date.now() - t);
    t = Date.now();

    // coins.callAll('animations.add', 'animations', 'spin3', [4, 2, 1, 5, 3, 0], 10, true);
    for (var i = 0; i < 2500; i++)
    {
        coins.children[i].animations.add('spin3', [5, 4, 3, 2, 1, 0], 10, true);
    }

    console.log('step 3', Date.now() - t);
    t = Date.now();

    // coins.callAll('animations.add', 'animations', 'spin4', [5, 0, 0, 3, 2, 1], 10, true);
    for (var i = 0; i < 2500; i++)
    {
        coins.children[i].animations.add('spin4', [5, 4, 3, 2, 1, 0], 10, true);
    }

    console.log('step 4', Date.now() - t);
    t = Date.now();

    // coins.callAll('animations.add', 'animations', 'spin5', [2, 1, 3, 5, 7, 0], 10, true);
    for (var i = 0; i < 2500; i++)
    {
        coins.children[i].animations.add('spin5', [5, 4, 3, 2, 1, 0], 10, true);
    }

    console.log('step 5', Date.now() - t);

    //  And play them
    coins.callAll('animations.play', 'animations', 'spin');

}
