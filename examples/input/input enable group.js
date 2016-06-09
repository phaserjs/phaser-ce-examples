
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

var text = '';

function preload() {

    game.load.image('beball', 'assets/sprites/beball1.png');
    game.load.image('bikkuriman', 'assets/sprites/bikkuriman.png');

}

function create() {

    var group = game.add.group();

    //  This will automatically inputEnable all children added to the Group
    group.inputEnableChildren = true;

    for (var i = 0; i < 10; i++)
    {
        var sprite = group.create(64 + (64 * i), 400, 'beball');

        sprite.name = 'child' + i;

        sprite.events.onInputDown.add(clickedSprite, this);
    }

}

function clickedSprite (sprite) {

    text = sprite.name;

    sprite.y -= 16;

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
