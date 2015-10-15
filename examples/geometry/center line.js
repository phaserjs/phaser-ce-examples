
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create, update: update, render: render });

var line;

function create() {

    game.stage.backgroundColor = '#124184';

    line = new Phaser.Line(100, 100, 200, 200);

}

function update() {

    line.centerOn(game.input.activePointer.x, game.input.activePointer.y);
    line.rotate(0.05);
 
}

function render() {

    game.debug.geom(line);
    game.debug.lineInfo(line, 32, 32);

}