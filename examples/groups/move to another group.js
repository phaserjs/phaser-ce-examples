
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

 function preload() {

    game.load.image('ship1', 'assets/sprites/bsquadron1.png');
    game.load.image('ship2', 'assets/sprites/bsquadron3.png');

}

var group1;
var group2;

function create() {

    //  Our first group, this will move vertically up the screen
    group1 = game.add.group();
    group1.y = 600;

    //  Our second group, this will move vertically down the screen
    group2 = game.add.group();
    group2.y = -150;

    //  Add 10 sprites to each group
    for (var i = 0; i < 10; i++)
    {
        group1.create(game.rnd.between(0, 740), game.rnd.between(0, 100), 'ship1');
        group2.create(game.rnd.between(0, 736), game.rnd.between(0, 100), 'ship2');
    }

    //  Tween the Groups
    game.add.tween(group1).to( { y: -150 }, 5000, "Linear", true, 0, -1);
    game.add.tween(group2).to( { y: 600 }, 5000, "Linear", true, 0, -1);

    //  Upon click / touch call this ...
    game.input.onDown.addOnce(moveShips, this);

}

function moveShips() {

    //  This moves all ships from group 1 into group 2
    group1.moveAll(group2);

}

function render() {

    game.debug.text("Group 1 size: " + group1.length, 32, 32);
    game.debug.text("Group 2 size: " + group2.length, 32, 64);

    if (group1.length === 10)
    {
        game.debug.text("Click to move children", 32, 96);
    }

}