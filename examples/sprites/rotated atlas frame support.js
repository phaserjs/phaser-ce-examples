
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.atlas('atlas', 'assets/sprites/atlas_rotated.png', 'assets/sprites/atlas_rotated.json');

}

function create() {

    game.stage.backgroundColor = '#404040';

    //  These two are both rotated
    game.add.sprite(0, 200, 'atlas', 'cactuar');
    game.add.sprite(300, 200, 'atlas', 'contra1');

    //  But this one isn't
    game.add.sprite(500, 200, 'atlas', 'shocktroopers_lulu2');

}
