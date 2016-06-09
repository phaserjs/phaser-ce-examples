
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

function preload() {

    game.load.image('beball', 'assets/sprites/beball1.png');
    game.load.image('bikkuriman', 'assets/sprites/bikkuriman.png');
    game.load.image('square', 'assets/sprites/50x50.png');

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
        sprite1.events.onInputDown.add(clickedSprite, this);

        var sprite2 = group2.create(64 + (64 * i), 350, 'bikkuriman');
        sprite2.name = 'group2-child-' + i;
        sprite2.events.onInputDown.add(clickedSprite, this);
    }

    //  Our toggle switch
    var toggle = this.add.sprite(800-66, 16, 'square');
    toggle.inputEnabled = true;
    toggle.events.onInputDown.add(toggleGroup, this);

}

function toggleGroup () {

    //  By setting ignoreChildInput to true we can tell Group 2s children
    //  to ignore all input events

    group2.ignoreChildInput = (group2.ignoreChildInput) ? false : true;

}

function clickedSprite (sprite) {

    text = sprite.name;

    sprite.tint = 0xff0000;

}

function render() {

    if (text === '')
    {
        game.debug.text("Click the Sprites. Click the square to toggle Group 2 input.", 32, 32);
    }
    else
    {
        game.debug.text("You clicked: " + text, 32, 32);
    }

    game.debug.text("Group2.ignoreChildInput: " + group2.ignoreChildInput, 32, 64);

}
