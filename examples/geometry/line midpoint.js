
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.spritesheet('balls', 'assets/sprites/balls.png', 17, 17);

}

var handle1;
var handle2;

var line;
var mid;

function create() {

    game.stage.backgroundColor = '#124184';

    handle1 = game.add.sprite(100, 200, 'balls', 0);
    handle1.anchor.set(0.5);
    handle1.inputEnabled = true;
    handle1.input.enableDrag(true);

    handle2 = game.add.sprite(400, 300, 'balls', 0);
    handle2.anchor.set(0.5);
    handle2.inputEnabled = true;
    handle2.input.enableDrag(true);

    line = new Phaser.Line(handle1.x, handle1.y, handle2.x, handle2.y);
    mid = new Phaser.Point();

}

function update() {

    line.fromSprite(handle1, handle2, false);

    line.midPoint(mid);
 
}

function render() {

    game.debug.geom(line);
    game.debug.geom(mid, '#ffff00');
    game.debug.lineInfo(line, 32, 32);

    game.debug.text("Drag the handles", 32, 550);

}