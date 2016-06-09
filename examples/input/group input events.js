
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

function preload() {

    game.load.image('beball', 'assets/sprites/beball1.png');
    game.load.image('bikkuriman', 'assets/sprites/bikkuriman.png');

}

var text = '';
var group1;
var group2;

function create() {

    //  Let's create 2 Groups
    group1 = game.add.group();
    group2 = game.add.group();

    //  This will automatically inputEnable all children added to both Groups
    group1.inputEnableChildren = true;
    group2.inputEnableChildren = true;

    //  Create 10 Sprites per Group
    for (var i = 0; i < 10; i++)
    {
        var sprite1 = group1.create(64 + (64 * i), 150, 'beball');
        sprite1.name = 'group1-child-' + i;

        var sprite2 = group2.create(64 + (64 * i), 350, 'bikkuriman');
        sprite2.name = 'group2-child-' + i;
    }

    //  And now we'll listen to the Group events
    group1.onChildInputDown.add(onDown, this);
    group2.onChildInputDown.add(onDown, this);

    group1.onChildInputOver.add(onOver, this);
    group2.onChildInputOver.add(onOver, this);

    group1.onChildInputOut.add(onOut, this);
    group2.onChildInputOut.add(onOut, this);

}

function onDown (sprite) {

    text = "onDown: " + sprite.name;

    sprite.tint = 0x00ff00;

}

function onOver (sprite) {

    text = "onOver: " + sprite.name;

    sprite.tint = 0xff0000;

}

function onOut (sprite) {

    text = "onOut: " + sprite.name;

    sprite.tint = 0xffffff;

}

function render() {

    if (text === '')
    {
        game.debug.text("Interact with the Sprites.", 32, 32);
    }
    else
    {
        game.debug.text(text, 32, 32);
    }

}
