
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create, update: update, render: render });

var rectA;
var rectB;

function create() {

    rectA = new Phaser.Rectangle(0, 0, 200, 100);
    rectB = new Phaser.Rectangle(100, 100, 500, 400);

}

function update() {

    rectA.x = game.input.activePointer.x;
    rectA.y = game.input.activePointer.y;

}

function render() {

    game.debug.geom(rectA, 'rgba(200,0,0,0.5)');
    game.debug.geom(rectB, 'rgba(0,0,255,0.5)');

    var intersects = Phaser.Rectangle.intersection(rectA, rectB);

    game.debug.geom(intersects, 'rgba(255,0,0,1)');

}