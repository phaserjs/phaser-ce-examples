
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

function preload() {

    game.load.atlas('rain', 'wip/razor.png', 'wip/razor.json');
    game.load.atlas('rain-notrim', 'wip/razor-notrim.png', 'wip/razor-notrim.json');

}

var rain;
var rain2;

function create() {

    game.stage.backgroundColor = '#2d2d2d';

    rain = game.add.sprite(32, 100, 'rain', 'razor_rain_vertical_10');
    rain2 = game.add.sprite(300, 100, 'rain', 'razor_rain_vertical_30');

    rain.animations.add('pouring', Phaser.Animation.generateFrameNames('razor_rain_vertical_', 0, 42, '', 2), 30, true);
    rain2.animations.add('pouring', Phaser.Animation.generateFrameNames('razor_rain_vertical_', 0, 42, '', 2), 30, true);

    //  Issue is specifically an ANCHOR set on a TRIMMED frame
    // rain2.anchor.x = 0.5;
    // rain2.angle = 10;

    // rain.crop(new Phaser.Rectangle(0, 0, rain.width, 100));
    rain2.crop(new Phaser.Rectangle(0, 0, 100, 100));

    rain.animations.play('pouring', 30, true);
    rain2.animations.play('pouring', 30, true);

    game.input.keyboard.onPressCallback = nextFrame;

}

function nextFrame(char) {

    if (char === '+')
    {
        rain.animations.next(2);
        rain2.animations.next(2);
    }
    else if (char === '-')
    {
        rain.animations.previous(2);
        rain2.animations.previous(2);
    }

}

function render() {

    // game.debug.geom(rain.texture.frame);

    game.debug.text('Frame: ' + rain.frameName, 32, 64);

    game.debug.text('x: ' + rain.texture.frame.x, 500, 64);
    game.debug.text('y: ' + rain.texture.frame.y, 500, 64+32);
    game.debug.text('width: ' + rain.texture.frame.width, 500, 64+64);
    game.debug.text('height: ' + rain.texture.frame.height, 500, 64+96);

    game.debug.text('tx: ' + rain.texture.trim.x, 500, 264);
    game.debug.text('ty: ' + rain.texture.trim.y, 500, 264+32);
    game.debug.text('twidth: ' + rain.texture.trim.width, 500, 264+64);
    game.debug.text('theight: ' + rain.texture.trim.height, 500, 264+96);

    game.debug.text('x: ' + rain2.texture.frame.x, 640, 64);
    game.debug.text('y: ' + rain2.texture.frame.y, 640, 64+32);
    game.debug.text('width: ' + rain2.texture.frame.width, 640, 64+64);
    game.debug.text('height: ' + rain2.texture.frame.height, 640, 64+96);

    game.debug.text('tx: ' + rain2.texture.trim.x, 640, 264);
    game.debug.text('ty: ' + rain2.texture.trim.y, 640, 264+32);
    game.debug.text('twidth: ' + rain2.texture.trim.width, 640, 264+64);
    game.debug.text('theight: ' + rain2.texture.trim.height, 640, 264+96);


}


