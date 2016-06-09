
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

var text = '';

function preload() {

    game.load.image('block', 'assets/sprites/block.png');

}

function create() {

    //  When you click a Sprite, the top-most one in the display list,
    //  i.e. the one created LAST, will receive the input event.
    //  Not the ones below it.

    for (var i = 0; i < 10; i++)
    {
        var sprite = game.add.sprite(64 + (64 * i), 200 + (i*4), 'block');

        sprite.name = 'block' + i;

        sprite.inputEnabled = true;

        sprite.events.onInputDown.add(clickedSprite, this);
    }

}

function clickedSprite (sprite) {

    text = sprite.name + ' RenderOrderID: ' + sprite.renderOrderID;

    sprite.tint = 0xff0000;

}

function render() {

    if (text === '')
    {
        game.debug.text("Click the Sprites", 32, 32);
    }
    else
    {
        game.debug.text("You clicked: " + text, 32, 32);
    }

}
