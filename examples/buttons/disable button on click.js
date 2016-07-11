
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.spritesheet('button', 'assets/buttons/button_sprite_sheet.png', 193, 71);

}

var button;

function create() {

    game.stage.backgroundColor = '#182d3b';

    button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 2, 1, 0);

    button.onInputOver.add(over, this);
    button.onInputOut.add(out, this);

}

function over() {
    console.log('button over');
}

function out() {
    console.log('button out');
}

function actionOnClick () {

    console.log('click');

    button.inputEnabled = false;

    // this.game.canvas.style.cursor = "default";

}
