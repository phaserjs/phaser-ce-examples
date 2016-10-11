
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.path = 'assets/atlas/';

    game.load.multiatlas('megaset', 
        ['megasetHD-0.png', 'megasetHD-1.png', 'megasetHD-2.png', 'megasetHD-3.png'],
        ['megasetHD-0.json', 'megasetHD-1.json', 'megasetHD-2.json', 'megasetHD-3.json']
    );

}

function create() {

    game.add.image(0, 0, 'megaset', 'contra3');

}
