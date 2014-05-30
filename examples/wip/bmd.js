var cfg = {

    width: "100%",
    height: "100%",
    renderer: Phaser.AUTO,
    state: { preload: preload, create: create, update: update, render: render }

}

var game = new Phaser.Game(cfg);

function preload() {

    game.load.image('pic', '/phaser-examples/examples/assets/pics/1984-nocooper-space.png');
    game.load.image('ball', '/phaser-examples/examples/assets/sprites/shinyball.png');

}

var image;
var bmd;
var ball;

function create() {

    // console.log('size ' + game.width + ' x ' + game.height);
    // console.log('scale ' + game.scale.width + ' x ' + game.scale.height);
    // console.log('input ' + game.input.scale.x + ' x ' + game.input.scale.y);
    // console.log('offset ' + game.stage.offset.x + ' x ' + game.stage.offset.y);

    var pic = game.add.sprite(0, 50, 'pic');
    pic.scale.set(2);

    bmd = game.add.bitmapData(game.width, game.height);
    bmd.context.fillStyle = 'rgba(255,0,0,1)';
    bmd.addToWorld();

    ball = game.add.sprite(0, 0, 'ball');

}

function update() {

    bmd.context.fillRect(game.input.x, game.input.y, 8, 8);

    ball.x = game.input.x;
    ball.y = game.input.y;

}

function render() {

    game.debug.text(game.input.x, 320, 32);
    game.debug.text(game.input.y, 320, 64);

}
