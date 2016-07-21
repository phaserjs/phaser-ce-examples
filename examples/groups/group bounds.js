
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

function preload() {

    game.load.image('pic', 'assets/pics/archmage_in_your_face.png');
    game.load.spritesheet('diamonds', 'assets/sprites/diamonds32x24x5.png', 32, 24);
    
}

var pic;
var group;
var bounds;

function create() {

    game.stage.backgroundColor = '#2d2d2d';

    pic = game.add.sprite(0, 0, 'pic');
    pic.alignIn(game.world.bounds, Phaser.CENTER);

    //  Create our Group and populate it with a bunch of sprites

    group = game.add.group();

    //  Create a bunch of sprites that are spread irregularly around the Groups x/y coordinate

    group.create(0, 0, 'diamonds', 0);
    group.create(-200, -200, 'diamonds', 1);
    group.create(100, -200, 'diamonds', 2);
    group.create(100, 100, 'diamonds', 3);

    //  Even scaled and/or rotated, it still aligns properly
    // group.angle = 30;
    // group.scale.set(0.5);

    //  Test 1
    // group.centerX = game.world.centerX;
    // group.centerY = game.world.centerY;
    // console.log(group.centerX, game.world.centerX);
    // console.log(group.centerY, game.world.centerY);

    //  Test 2
    // group.left = 0;
    // group.centerY = game.world.centerY;
    // console.log(group.left, 0);
    // console.log(group.centerY, game.world.centerY);

    //  Test 3
    // group.left = game.world.centerX;
    // group.centerY = game.world.centerY;
    // console.log(group.left, game.world.centerX);
    // console.log(group.centerY, game.world.centerY);

    //  Test 4
    // group.right = game.width;
    // group.centerY = game.world.centerY;
    // console.log(group.right, game.width);
    // console.log(group.centerY, game.world.centerY);

    //  Test 5
    // group.top = 0;
    // group.centerX = game.world.centerX;
    // console.log(group.top, 0);
    // console.log(group.centerX, game.world.centerX);

    //  Test 6
    // group.bottom = game.height;
    // group.centerX = game.world.centerX;
    // console.log(group.bottom, game.height);
    // console.log(group.centerX, game.world.centerX);

    //  Test 7
    // group.top = 0;
    // group.left = 0;

    //  Test 8
    // group.right = game.width;
    // group.bottom = game.height;

    //  Align Tests
    // group.alignIn(pic, Phaser.TOP_LEFT);
    // group.alignIn(pic, Phaser.TOP_CENTER);
    // group.alignIn(pic, Phaser.TOP_RIGHT);
    // group.alignIn(pic, Phaser.LEFT_CENTER);
    // group.alignIn(pic, Phaser.CENTER);
    group.alignIn(pic, Phaser.RIGHT_CENTER);
    // group.alignIn(pic, Phaser.BOTTOM_LEFT);
    // group.alignIn(pic, Phaser.BOTTOM_CENTER);
    // group.alignIn(pic, Phaser.BOTTOM_RIGHT);

    // group.alignIn(game.world.bounds, Phaser.LEFT_CENTER);

    bounds = group.getBounds();

}

function render() {

    game.debug.geom(bounds);
    game.debug.geom(group.position, '#ffff00');

}