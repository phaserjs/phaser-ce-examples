game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update:update });

function preload() {

    game.load.image('phaser', 'assets/sprites/phaser-dude.png');
    game.load.image('logo', 'assets/sprites/phaser_tiny.png');
    game.load.image('pineapple', 'assets/sprites/pineapple.png');
    game.load.spritesheet('controller-indicator', 'assets/misc/controller-indicator.png', 16,16);

}

var button1;
var button2;
var button3;

var indicator;

function update() {
    // Pad "connected or not" indicator
    if(game.input.gamepad.supported && game.input.gamepad.active && game.input.gamepad.pad1.connected) {
        indicator.animations.frame = 0;
    } else {
        indicator.animations.frame = 1;
    }

    var p = game.input.gamepad.pad1;

    if (p.isDown(Phaser.Gamepad.BUTTON_0)) addPhaserDude();
    if (p.isDown(Phaser.Gamepad.BUTTON_1)) addPhaserLogo();
    if (p.isDown(Phaser.Gamepad.BUTTON_2)) addPineapple();

}

function create() {

    game.stage.backgroundColor = '#736357';

    game.input.gamepad.start();


    indicator = game.add.sprite(10,10, 'controller-indicator');
    indicator.scale.x = indicator.scale.y = 2;
    indicator.animations.frame = 1;

    //  Here we create 3 "hotkey buttons" for Gamepad #1, buttons 0-2 and bind them all to their own functions
    game.input.gamepad.pad1.reset();
}

function addPhaserDude () {
    game.add.sprite(game.world.randomX, game.world.randomY, 'phaser');
}

function addPhaserLogo () {
    game.add.sprite(game.world.randomX, game.world.randomY, 'logo');
}

function addPineapple () {
    game.add.sprite(game.world.randomX, game.world.randomY, 'pineapple');
}
