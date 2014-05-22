
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // game.scale.minWidth = 480;
    // game.scale.minHeight = 260;
    // game.scale.maxWidth = 1024;
    // game.scale.maxHeight = 768;
    // game.scale.pageAlignHorizontally = true;
    // game.scale.pageAlignVertically = true;
    // game.scale.setScreenSize(true);

    game.load.image('rain', 'assets/pics/thalion-rain.png');
    game.load.image('bubble', 'assets/pics/bubble-on.png');

}

var bubble;



function create() {

    console.log(game.scale.bounds);

    game.add.tileSprite(0, 0, 800, 600, 'rain');

    bubble = game.add.image(game.world.centerX, game.world.centerY, 'bubble');
    bubble.anchor.set(0.5);

    // game.input.mouse.mouseOverCallback = onMouseOver;
    // game.input.mouse.mouseOutCallback = onMouseOut;
    // game.input.mouse.callbackContext = this;

}

function onMouseOver() {

    bubble.alpha = 1;

}

function onMouseOut() {

    bubble.alpha = 0.3;

}

function update() {

    if (game.input.activePointer.withinGame)
    {
        bubble.alpha = 1;
    }
    else
    {
        bubble.alpha = 0.3;
    }

}
