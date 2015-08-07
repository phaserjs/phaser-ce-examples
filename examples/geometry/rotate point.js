
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', {create: create, update: update, render: render });

var p1;
var p2;

function create() {

    p1 = new Phaser.Point(300, 300);
    p2 = new Phaser.Point(400, 300);

}

function update() {

    //  We'll rotate point 1 (the yellow point)
    //  around point 2 (the red point) by 1 degree
    //  every update.

    // rotate: function (x, y, angle, asDegrees, distance) {
    // p1.rotate(p2.x, p2.y, 1, true, 200);
    p1.rotate(p2.x, p2.y, 1, true);

}

function render() {

    game.context.fillStyle = 'rgb(255,255,0)';
    game.context.fillRect(p1.x, p1.y, 4, 4);

    game.context.fillStyle = 'rgb(255,0,0)';
    game.context.fillRect(p2.x, p2.y, 4, 4);

}
