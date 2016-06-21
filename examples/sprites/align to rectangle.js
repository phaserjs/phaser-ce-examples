
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

function preload() {

    game.load.image('mushroom', 'assets/sprites/mushroom2.png');
    game.load.image('orb', 'assets/sprites/orb-red.png');

}

var sprite1;
var sprite2;
var sprite3;

var rect;

function create() {

    game.stage.backgroundColor = '#3433bb';

    //  Scaled + Anchor
    sprite3 = game.add.sprite(200, 400, 'mushroom');
    sprite3.anchor.set(0.5);
    sprite3.scale.set(2);

    //  With an anchor
    sprite1 = game.add.sprite(200, 150, 'mushroom');
    sprite1.anchor.set(0.5);

    //  No anchor set
    sprite2 = game.add.sprite(200, 250, 'orb');

    rect = new Phaser.Rectangle(200, 200, 400, 300);

    //  Aligns the sprites to the outside of the Rectangle
    sprite1.alignTo(rect, Phaser.TOP_CENTER);
    sprite2.alignTo(rect, Phaser.BOTTOM_RIGHT);
    sprite3.alignTo(rect, Phaser.LEFT_CENTER);

    // sprite1.alignTo(rect, Phaser.TOP_LEFT);
    // sprite2.alignTo(rect, Phaser.TOP_LEFT);
    // sprite3.alignTo(rect, Phaser.TOP_LEFT);

    // sprite1.alignTo(rect, Phaser.TOP_CENTER);
    // sprite2.alignTo(rect, Phaser.TOP_CENTER);
    // sprite3.alignTo(rect, Phaser.TOP_CENTER);

    // sprite1.alignTo(rect, Phaser.TOP_RIGHT);
    // sprite2.alignTo(rect, Phaser.TOP_RIGHT);
    // sprite3.alignTo(rect, Phaser.TOP_RIGHT);

    // sprite1.alignTo(rect, Phaser.LEFT_TOP);
    // sprite2.alignTo(rect, Phaser.LEFT_TOP);
    // sprite3.alignTo(rect, Phaser.LEFT_TOP);

    // sprite1.alignTo(rect, Phaser.LEFT_CENTER);
    // sprite2.alignTo(rect, Phaser.LEFT_CENTER);
    // sprite3.alignTo(rect, Phaser.LEFT_CENTER);

    // sprite1.alignTo(rect, Phaser.LEFT_BOTTOM);
    // sprite2.alignTo(rect, Phaser.LEFT_BOTTOM);
    // sprite3.alignTo(rect, Phaser.LEFT_BOTTOM);

    // sprite1.alignTo(rect, Phaser.RIGHT_TOP);
    // sprite2.alignTo(rect, Phaser.RIGHT_TOP);
    // sprite3.alignTo(rect, Phaser.RIGHT_TOP);

    // sprite1.alignTo(rect, Phaser.RIGHT_CENTER);
    // sprite2.alignTo(rect, Phaser.RIGHT_CENTER);
    // sprite3.alignTo(rect, Phaser.RIGHT_CENTER);

    // sprite1.alignTo(rect, Phaser.RIGHT_BOTTOM);
    // sprite2.alignTo(rect, Phaser.RIGHT_BOTTOM);
    // sprite3.alignTo(rect, Phaser.RIGHT_BOTTOM);

    // sprite1.alignTo(rect, Phaser.BOTTOM_LEFT);
    // sprite2.alignTo(rect, Phaser.BOTTOM_LEFT);
    // sprite3.alignTo(rect, Phaser.BOTTOM_LEFT);

    // sprite1.alignTo(rect, Phaser.BOTTOM_CENTER);
    // sprite2.alignTo(rect, Phaser.BOTTOM_CENTER);
    // sprite3.alignTo(rect, Phaser.BOTTOM_CENTER);

    // sprite1.alignTo(rect, Phaser.BOTTOM_RIGHT);
    // sprite2.alignTo(rect, Phaser.BOTTOM_RIGHT);
    // sprite3.alignTo(rect, Phaser.BOTTOM_RIGHT);

}

function render() {

    game.debug.rectangle(rect, '#ffffff', false);

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