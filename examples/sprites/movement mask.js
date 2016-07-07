
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('box', 'assets/sprites/block.png');
    game.load.image('platform', 'assets/sprites/platform.png');

}

var box;

function create() {


    //  A platform the box will 'rise' out of
    var platform = game.add.sprite(150, game.world.centerY, 'platform');
    platform.height = 8;

    //  Box sprite is 95x95
    box = game.add.sprite(400, 400, 'box');
    box.anchor.set(0.5);

    //  A mask is a Graphics object
    var mask = game.add.graphics(330, 100);

    //  Shapes drawn to the Graphics object must be filled.
    mask.beginFill(0xffffff);

    //  Here we'll draw a rectangle
    mask.drawRect(0, 0, 140, 200);

    //	And apply it to the Sprite
    box.mask = mask;

    game.add.tween(box).to({ y: 200 }, 1000, "Sine.easeInOut", true, 0, -1, true);

}

function update() {

    box.rotation += 0.02;

}