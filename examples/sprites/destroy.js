
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('plane', 'assets/misc/boss1.png');
    game.load.image('sky', 'assets/tests/sky-2x.png');

}

function create() {

    game.add.sprite(0, 0, 'sky');

    var mx = game.width - game.cache.getImage('plane').width;
    var my = game.height - game.cache.getImage('plane').height;

    for (var i = 0; i < 5; i++)
    {
        var sprite = game.add.sprite(game.rnd.integerInRange(0, mx), game.rnd.integerInRange(0, my), 'plane');

        sprite.inputEnabled = true;

        sprite.input.useHandCursor = true;

        sprite.events.onInputDown.add(destroySprite, this);
    }

}

function destroySprite (sprite) {

    sprite.destroy();

}
