
// var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });
var game = new Phaser.Game(320, 241, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('dragon', 'assets/pics/cougar_dragonsun.png');
    game.load.image('star', 'assets/pics/monika_krawinkel-amberstar_title.png');
    game.load.image('nanoha', 'assets/pics/nanoha_taiken_pink.png');

}

function create() {

    // game.add.image(0, 0, 'star');

    var i = game.add.image(game.world.centerX, game.world.centerY, 'nanoha');
    i.anchor.set(0.5);

    // var sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'dragon');
    // sprite.anchor.set(0.5);

    game.stage.backgroundColor = '#4d4d4d';

    // Stretch to fill
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

    // Keep original size
    // game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;

    // Maintain aspect ratio
    // game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

    game.input.onDown.add(gofull, this);

}

function gofull() {

    if (game.scale.isFullScreen)
    {
        game.scale.stopFullScreen();
    }
    else
    {
        game.scale.startFullScreen(false);
    }

}

function update() {

}

function render () {

    // game.debug.text('Click / Tap to go fullscreen', 270, 16);
    // game.debug.text('Click / Tap to go fullscreen', 0, 16);

    game.debug.inputInfo(32, 32);
    // game.debug.pointer(game.input.activePointer);

}
