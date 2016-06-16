
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create });

function create() {

    //  Create a Rectangle
    var rectangle = new Phaser.Rectangle(100, 200, 600, 200);

    //  Create a BitmapData just to plot the points to
    var bmd = game.add.bitmapData(game.width, game.height);

    bmd.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height, '#2d2d2d');

    //  Draw the 9 points that getPoint can return

    var p = new Phaser.Point();

    rectangle.getPoint(Phaser.TOP_LEFT, p);
    bmd.rect(p.x, p.y, 2, 2, '#ff00ff');

    rectangle.getPoint(Phaser.TOP_CENTER, p);
    bmd.rect(p.x, p.y, 2, 2, '#ff00ff');

    rectangle.getPoint(Phaser.TOP_RIGHT, p);
    bmd.rect(p.x, p.y, 2, 2, '#ff00ff');

    rectangle.getPoint(Phaser.MIDDLE_LEFT, p);
    bmd.rect(p.x, p.y, 2, 2, '#ff00ff');

    rectangle.getPoint(Phaser.MIDDLE_CENTER, p);
    bmd.rect(p.x, p.y, 2, 2, '#ff00ff');

    rectangle.getPoint(Phaser.MIDDLE_RIGHT, p);
    bmd.rect(p.x, p.y, 2, 2, '#ff00ff');

    rectangle.getPoint(Phaser.BOTTOM_LEFT, p);
    bmd.rect(p.x, p.y, 2, 2, '#ff00ff');

    rectangle.getPoint(Phaser.BOTTOM_CENTER, p);
    bmd.rect(p.x, p.y, 2, 2, '#ff00ff');

    rectangle.getPoint(Phaser.BOTTOM_RIGHT, p);
    bmd.rect(p.x, p.y, 2, 2, '#ff00ff');

    bmd.addToWorld();

}
