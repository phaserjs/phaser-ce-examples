
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create, render: render });

var circle;

function create() {

    circle = new Phaser.Circle(game.world.centerX, 100,64);

}

function render () {

    game.debug.geom(circle,'#cdeb96');
    game.debug.text('Diameter : '+circle.diameter,50,200);
    game.debug.text('Circumference : '+circle.circumference(),50,230);

}
