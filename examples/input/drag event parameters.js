
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, render: render });

function preload() {

    game.load.image('grid', 'assets/tests/debug-grid-1920x1920.png');
    game.load.image('atari', 'assets/sprites/atari800xl.png');
    game.load.image('sonic', 'assets/sprites/sonic_havok_sanity.png');

}

var result = 'Drag a sprite';

function create() {

    game.add.sprite(0, 0, 'grid');

    var atari = game.add.sprite(32, 100, 'atari');

    //  Enable input and allow for dragging
    atari.inputEnabled = true;
    atari.input.enableDrag();
    atari.events.onDragStart.add(onDragStart, this);
    atari.events.onDragStop.add(onDragStop, this);

    var sonic = game.add.sprite(300, 200, 'sonic');

    sonic.inputEnabled = true;
    sonic.input.enableDrag();
    sonic.events.onDragStart.add(onDragStart, this);
    sonic.events.onDragStop.add(onDragStop, this);

}

function onDragStart(sprite, pointer) {

    result = "Dragging " + sprite.key;

}

function onDragStop(sprite, pointer) {

    result = sprite.key + " dropped at x:" + pointer.x + " y: " + pointer.y;

}

function render() {

    game.debug.text(result, 10, 20);

}
