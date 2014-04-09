
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

 function preload() {

    game.load.image('wasp', 'assets/sprites/wasp.png');
    game.load.image('sonic', 'assets/sprites/sonic_havok_sanity.png');
    game.load.image('phaser', 'assets/sprites/phaser.png');

}

var sprites;

function create() {

    sprites = game.add.group();

    //  First we'll create 10 'wasp' sprites
    for (var i = 0; i < 10; i++)
    {
        sprites.create(game.world.randomX, game.world.randomY, 'wasp');
    }

    //  Next we'll create 10 'sonic' sprites
    for (var i = 0; i < 10; i++)
    {
        sprites.create(game.world.randomX, game.world.randomY, 'sonic');
    }

    //  Finally we'll create 10 'phaser' sprites
    for (var i = 0; i < 10; i++)
    {
        sprites.create(game.world.randomX, game.world.randomY, 'phaser');
    }

    this.input.onDown.addOnce(remove, this);

}

function remove() {

    //  This will remove all of the 'sonic' sprites from the Group
    //  because we're removing all sprites between indexes 10 through to 19
    sprites.removeBetween(10, 19);

}

function render() {

    game.debug.text('Group size: ' + sprites.total, 32, 32);

}