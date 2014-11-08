
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.spritesheet('button', 'assets/buttons/button_sprite_sheet.png', 193, 71);
    game.load.image('background','assets/misc/starfield.jpg');

}

var group;

function create() {

    game.add.tileSprite(0, 0, 800, 600, 'background');

    group = game.add.group();

    var button = game.make.button(game.world.centerX - 95, 400, 'button', removeGroup, this, 2, 1, 0);

    window.rich = button;

    button.onInputOver.add(over, this);
    button.onInputOut.add(out, this);

    // game.input.onDown.addOnce(removeGroup, this);

    group.add(button);

}

function removeGroup() {

    game.world.remove(group);

    // group.destroy();

}

function over() {
    console.log('button over');
}

function out() {
    console.log('button out');
}

function actionOnClick () {

    console.log('button clicked');

}
