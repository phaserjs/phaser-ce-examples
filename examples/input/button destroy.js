
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.spritesheet('button', 'assets/buttons/button_sprite_sheet.png', 193, 71);

}

var button;

function create() {

    game.stage.backgroundColor = '#4b0049';

    button = game.add.button(game.world.centerX - 95, 460, 'button', nukeButton, this, 2, 1, 0);

}

function nukeButton() {

    button.pendingDestroy = true;

    text = game.add.text(game.world.centerX, game.world.centerY, '- button nuked -', { font: '64px Arial', fill: '#ffffff' });

    text.anchor.set(0.5);

}
