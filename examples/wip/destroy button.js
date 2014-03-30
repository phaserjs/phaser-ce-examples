
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.spritesheet('button', 'assets/buttons/button_sprite_sheet.png', 193, 71);

}

var button;

function create() {

    button = game.add.button(game.world.centerX - 95, 400, 'button', null, null, 2, 1, 0);
    button.onInputDown.add(nukeIt, this);

}

function nukeIt() {

	button.destroy();

}
