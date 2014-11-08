
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create, update: update, render: render });

var poly;
var graphics;

function create() {

    poly = new Phaser.Polygon([ new Phaser.Point(200, 100), new Phaser.Point(350, 100), new Phaser.Point(375, 200), new Phaser.Point(150, 200) ]);

    graphics = game.add.graphics(0, 0);

    graphics.beginFill(0xFF33ff);
    graphics.drawPolygon(poly.points);
    graphics.endFill();

}

function update() {

    graphics.clear();

    if (poly.contains(game.input.x, game.input.y))
    {
        graphics.beginFill(0xFF3300);
    }
    else
    {
        graphics.beginFill(0xFF33ff);
    }

    graphics.drawPolygon(poly.points);
    graphics.endFill();

}

function render() {

    game.debug.text(game.input.x + ' x ' + game.input.y, 32, 32);

}