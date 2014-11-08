
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create });

var poly;
var graphics;

function create() {

    //  Different ways of creating a Polygon:

    //  Array of Point values
    // poly = new Phaser.Polygon([ new Phaser.Point(200, 100), new Phaser.Point(350, 100), new Phaser.Point(375, 200), new Phaser.Point(150, 200) ]);

    //  Point values as parameters
    // poly = new Phaser.Polygon(new Phaser.Point(200, 100), new Phaser.Point(350, 100), new Phaser.Point(375, 200), new Phaser.Point(150, 200));

    //  Array of numbers treated as x/y pairs
    // poly = new Phaser.Polygon([200, 100, 350, 100, 375, 200, 150, 200]);

    //  Numbers in x/y pairs as parameters
    // poly = new Phaser.Polygon(200, 100, 350, 100, 375, 200, 150, 200);

    //  Array of mixed-type values
    // poly = new Phaser.Polygon([ new Phaser.Point(200, 100), 350, 100, 375, 200, new Phaser.Point(150, 200) ]);

    //  Mixed-type values as parameters
    // poly = new Phaser.Polygon(new Phaser.Point(200, 100), 350, 100, 375, 200, new Phaser.Point(150, 200));

    //  Array of Objects with visible x/y properties
    // poly = new Phaser.Polygon([ { x: 200, y: 100 }, { x: 350, y: 100 }, { x: 375, y: 200}, { x: 150, y: 200 } ]);

    //  Objects with visible x/y properties as parameters
    // poly = new Phaser.Polygon( { x: 200, y: 100 }, { x: 350, y: 100 }, { x: 375, y: 200}, { x: 150, y: 200 });



    //  You can also create an empty Polygon:
    poly = new Phaser.Polygon();

    //  And then populate it via setTo, using any combination of values as above
    poly.setTo([ new Phaser.Point(200, 100), new Phaser.Point(350, 100), new Phaser.Point(375, 200), new Phaser.Point(150, 200) ]);



    graphics = game.add.graphics(0, 0);

    graphics.beginFill(0xFF33ff);
    graphics.drawPolygon(poly.points);
    graphics.endFill();

}
