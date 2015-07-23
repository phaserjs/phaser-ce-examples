
var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('sky', 'assets/skies/deepblue.png');
    game.load.image('dragonTexture', 'assets/creature/phoenix.png');
    game.load.json('dragonMesh', 'assets/creature/phoenix.json');

}

var dragon = null;

function create() {

    game.add.image(0, 0, 'sky');

    dragon = game.add.creature(450, 350, 'dragonTexture', 'dragonMesh');

    dragon.setAnimation('flight');

    dragon.scale.set(25.0);
    
    dragon.play(true); //  true = loop

}
