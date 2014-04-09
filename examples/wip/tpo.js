
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.atlas('atlas', 'assets/pics/texturepacker_test.png', 'assets/pics/texturepacker_test.json');

}

var chick;
var car;
var mech;
var robot;
var cop;
var text;

function create() {

    game.stage.backgroundColor = '#404040';

    //  This demonstrates pixel perfect click detection even if using sprites in a texture atlas.

    chick = game.add.sprite(0, 0, 'atlas', 'budbrain_chick.png');
    chick.x = chick.animations.currentFrame.x;
    chick.y = chick.animations.currentFrame.y;

    // cop = game.add.sprite(600, 64, 'atlas');
    // cop.frameName = 'ladycop.png';
    // cop.inputEnabled = true;
    // cop.input.pixelPerfectClick = true;
    // cop.events.onInputDown.add(clicked, this);

    // robot = game.add.sprite(50, 300, 'atlas');
    // robot.frameName = 'robot.png';
    // robot.inputEnabled = true;
    // robot.input.pixelPerfectClick = true;
    // robot.events.onInputDown.add(clicked, this);

    car = game.add.sprite(0, 0, 'atlas', 'supercars_parsec.png');
    car.x = car.animations.currentFrame.x;
    car.y = car.animations.currentFrame.y;

    // mech = game.add.sprite(250, 100, 'atlas');
    // mech.frameName = 'titan_mech.png';
    // mech.inputEnabled = true;
    // mech.input.pixelPerfectClick = true;
    // mech.events.onInputDown.add(clicked, this);

}
