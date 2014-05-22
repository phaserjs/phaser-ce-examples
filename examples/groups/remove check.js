
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

 function preload() {

    game.load.image('wasp', 'assets/sprites/wasp.png');
    game.load.image('sonic', 'assets/sprites/sonic_havok_sanity.png');
    game.load.image('phaser', 'assets/sprites/phaser.png');

}

var group;
var sprite;

function create() {

    group = game.add.group();

    //  First we'll create 10 'wasp' sprites in the group
    for (var i = 0; i < 10; i++)
    {
        group.create(game.world.randomX, game.world.randomY, 'wasp');
    }

    //  And now we'll create a sprite that is NOT in the group
    sprite = game.add.sprite(200, 20, 'sonic');

    this.input.onDown.addOnce(remove, this);

}

function remove() {

    //  This should do nothing, because sprite isn't a child of the group
    group.remove(sprite);

}

function render() {

    game.debug.text('Group size: ' + group.total, 32, 32);

}