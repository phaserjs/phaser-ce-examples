
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('phaser', 'assets/sprites/phaser-dude.png');
    game.load.image('logo', 'assets/sprites/phaser_tiny.png');
    game.load.image('pineapple', 'assets/sprites/pineapple.png');

}

var key1;
var key2;
var key3;

function create() {

    game.stage.backgroundColor = '#736357';

    game.add.text(0, 0, 'Press one, two or three !', {} );

    //  Here we create 3 hotkeys, keys 1-3 and bind them all to their own functions

    key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    key1.onDown.add(addPhaserDude, this);

    key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    key2.onDown.add(addPhaserLogo, this);

    key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
    key3.onDown.add(addPineapple, this);

    //  Option 1 - in the update loop you can disable all input if the pointer isn't over the game
    //  (see update function)

    //  Option 2 - Alternatively, Remove captures so they flood up to the browser too
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.ONE);
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.TWO);
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.THREE);

    //  Option 3 - If the game is an iframe, or chat is in another window, use Game.onBlur and Game.onFocus instead
    // game.onBlur.add(...);
    // game.onFocus.add(...);

}

function update() {

    if (game.input.activePointer.withinGame)
    {
        game.input.enabled = true;
        game.stage.backgroundColor = '#736357';
    }
    else
    {
        game.input.enabled = false;
        game.stage.backgroundColor = '#731111';
    }

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
