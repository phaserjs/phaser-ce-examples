
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create, update: update, render: render });

var line;

function create() {

    game.stage.backgroundColor = '#011052';

    line = new Phaser.Line(300, 100, 500, 500);

}

function update() {

    line.rotate(1, true);
 
}

function render() {

    game.debug.geom(line);

}