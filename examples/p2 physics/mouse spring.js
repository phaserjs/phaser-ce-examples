var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, preRender: preRender, render: render });

function preload() {

    game.load.image('gummi', 'wip/gummi.png');
    game.load.image('cow', 'wip/cow48.png');
    game.load.image('cursor', 'assets/sprites/enemy-bullet.png');

}

var cow;
var line;
var mouseBody;
var mouseSpring;
var drawLine = false;

function create() {
        
    game.stage.backgroundColor = '#304871';

    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 100;
    game.physics.p2.restitution = 0.8;

    //  Create an object to pick-up

    cow = game.add.sprite(200, 200, 'cow');
    // game.physics.p2.enable(cow, false);
    game.physics.p2.enable(cow, true);
    cow.body.setCircle(20);

    //  Create our Mouse Cursor / Spring

    mouseBody = game.add.sprite(100, 100, 'cursor');
    game.physics.p2.enable(mouseBody, true);
    mouseBody.body.static = true;
    mouseBody.body.setCircle(10);
    mouseBody.body.data.shapes[0].sensor = true;

    //  Debug spring line

    line = new Phaser.Line(cow.x, cow.y, mouseBody.x, mouseBody.y);

    game.input.onDown.add(click, this);
    game.input.onUp.add(release, this);
    game.input.addMoveCallback(move, this);

}

function click(pointer) {

    var bodies = game.physics.p2.hitTest(pointer.position, [ cow.body ]);
    
    if (bodies.length)
    {
        //  Attach to the first body the mouse hit
        mouseSpring = game.physics.p2.createSpring(mouseBody, bodies[0], 0, 30, 1);
        line.setTo(cow.x, cow.y, mouseBody.x, mouseBody.y);
        drawLine = true;
    }

}

function release() {

    game.physics.p2.removeSpring(mouseSpring);

    drawLine = false;

}

function move(pointer, x, y, isDown) {

    mouseBody.body.x = x;
    mouseBody.body.y = y;
    line.setTo(cow.x, cow.y, mouseBody.x, mouseBody.y);

}

function preRender() {

    if (line)
    {
        line.setTo(cow.x, cow.y, mouseBody.x, mouseBody.y);
    }

}

function render() {

    if (drawLine)
    {
        game.debug.geom(line);
    }

}
