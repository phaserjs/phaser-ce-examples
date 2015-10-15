
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create});

function preload() {

    game.load.image('disk', 'assets/sprites/copy-that-floppy.png');
    game.load.image('ball', 'assets/sprites/mushroom2.png');

}

var parent;
var child;

function create() {

    parent = game.add.sprite(100, 100, 'disk');
    parent.name = 'disk';

    child = game.make.sprite(0, 0, 'ball');
    parent.addChild(child);

    //  Fix the scale of the child so it will never scale below 1 or above 2
    child.setScaleMinMax(1, 2);

    //  Even though the parent will scale, the child will remain at its own scale (and this is carried on down to any of its children)
    game.add.tween(parent.scale).to( { x: 3, y: 3 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
    
}
