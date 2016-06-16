
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

function preload() {

    game.load.image('mushroom', 'assets/sprites/mushroom2.png');

}

var sprite1;
var sprite2;
var sprite3;

var rect;

function create() {

    game.stage.backgroundColor = '#3433bb';

    //  With an anchor
    sprite1 = game.add.sprite(200, 150, 'mushroom');
    sprite1.anchor.set(0.5);

    //  No anchor set
    sprite2 = game.add.sprite(200, 250, 'mushroom');

    //  Scaled + Anchor
    sprite3 = game.add.sprite(200, 400, 'mushroom');
    sprite3.anchor.set(0.5);
    sprite3.scale.set(2);

    rect = new Phaser.Rectangle(100, 50, 600, 500);

    //  Left
    // sprite1.left = rect.left;
    // sprite2.left = rect.left;
    // sprite3.left = rect.left;

    //  Center X

    console.log(rect.centerX);
    console.log(rect.getPoint(Phaser.TOP_CENTER));

    sprite1.centerX = rect.centerX;
    sprite2.centerX = rect.centerX;
    sprite3.centerX = rect.centerX;

    //  Center Y
    // sprite1.x = 200;
    // sprite2.x = 400;
    // sprite3.x = 600;
    // sprite1.centerY = rect.centerY;
    // sprite2.centerY = rect.centerY;
    // sprite3.centerY = rect.centerY;

    //  Right
    // sprite1.right = rect.right;
    // sprite2.right = rect.right;
    // sprite3.right = rect.right;

    //  Top
    // sprite1.x = 200;
    // sprite2.x = 400;
    // sprite3.x = 600;
    // sprite1.top = rect.top;
    // sprite2.top = rect.top;
    // sprite3.top = rect.top;

    //  Bottom
    // sprite1.x = 200;
    // sprite2.x = 400;
    // sprite3.x = 600;
    // sprite1.bottom = rect.bottom;
    // sprite2.bottom = rect.bottom;
    // sprite3.bottom = rect.bottom;

}

function render() {

    game.debug.rectangle(rect, '#ffffff', false);
    // game.debug.geom(new Phaser.Point(rect.left, rect.centerY), '#ff00ff');
    // game.debug.geom(new Phaser.Point(rect.right, rect.centerY), '#ff00ff');
    // game.debug.geom(new Phaser.Point(rect.centerX, rect.top), '#ff00ff');
    // game.debug.geom(new Phaser.Point(rect.centerX, rect.centerY), '#ff00ff');
    // game.debug.geom(new Phaser.Point(rect.centerX, rect.bottom), '#ff00ff');

    game.debug.geom(rect.getPoint(Phaser.TOP_LEFT), '#ff00ff');
    game.debug.geom(rect.getPoint(Phaser.TOP_CENTER), '#ff00ff');
    game.debug.geom(rect.getPoint(Phaser.TOP_RIGHT), '#ff00ff');

    game.debug.geom(rect.getPoint(Phaser.MIDDLE_LEFT), '#ff00ff');
    game.debug.geom(rect.getPoint(Phaser.MIDDLE_CENTER), '#ff00ff');
    game.debug.geom(rect.getPoint(Phaser.MIDDLE_RIGHT), '#ff00ff');

    game.debug.geom(rect.getPoint(Phaser.BOTTOM_LEFT), '#ff00ff');
    game.debug.geom(rect.getPoint(Phaser.BOTTOM_CENTER), '#ff00ff');
    game.debug.geom(rect.getPoint(Phaser.BOTTOM_RIGHT), '#ff00ff');

}