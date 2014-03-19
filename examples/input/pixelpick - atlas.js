
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

    chick = game.add.sprite(64, 64, 'atlas');
    chick.frameName = 'budbrain_chick.png';
    chick.inputEnabled = true;
    chick.input.pixelPerfectClick = true;
    chick.events.onInputDown.add(clicked, this);

    cop = game.add.sprite(600, 64, 'atlas');
    cop.frameName = 'ladycop.png';
    cop.inputEnabled = true;
    cop.input.pixelPerfectClick = true;
    cop.events.onInputDown.add(clicked, this);

    robot = game.add.sprite(50, 300, 'atlas');
    robot.frameName = 'robot.png';
    robot.inputEnabled = true;
    robot.input.pixelPerfectClick = true;
    robot.events.onInputDown.add(clicked, this);

    car = game.add.sprite(100, 400, 'atlas');
    car.frameName = 'supercars_parsec.png';
    car.inputEnabled = true;
    car.input.pixelPerfectClick = true;
    car.events.onInputDown.add(clicked, this);

    mech = game.add.sprite(250, 100, 'atlas');
    mech.frameName = 'titan_mech.png';
    mech.inputEnabled = true;
    mech.input.pixelPerfectClick = true;
    mech.events.onInputDown.add(clicked, this);

    text = game.add.text(16, 16, 'Click a sprite', { fill: '#ffffff' });

}

function clicked(sprite) {

    text.text = 'You clicked ' + sprite.frameName;

}
