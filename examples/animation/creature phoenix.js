
var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('sky', 'assets/skies/deepblue.png');
    game.load.image('phoenixTexture', 'assets/creature/phoenix.png');
    game.load.json('phoenixMesh', 'assets/creature/phoenix.json');

}

var phoenix = null;

function create() {

    game.add.image(0, 0, 'sky');

    phoenix = game.add.creature(450, 350, 'phoenixTexture', 'phoenixMesh');

    phoenix.setAnimation('flight');

    phoenix.scale.set(25.0);
    
    phoenix.play(true); //  true = loop

}
