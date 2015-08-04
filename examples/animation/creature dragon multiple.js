
var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'assets/skies/deepblue.png');
    game.load.image('dragonTexture', 'assets/creature/dragon.png');
    game.load.json('dragonMesh', 'assets/creature/dragon.json');

}

var dragon1 = null;
var dragon2 = null;

function create() {

    game.add.image(0, 0, 'sky');

    dragon1 = game.add.creature(150, 200, 'dragonTexture', 'dragonMesh');
    dragon1.scale.set(25.0);
    dragon1.play(true); //  true = loop

    dragon2 = game.add.creature(0, 400, 'dragonTexture', 'dragonMesh');
    dragon2.scale.set(40.0);
    dragon2.play(true); //  true = loop

}

function update() {

    dragon1.x += 2;

    if (dragon1.x > 1000)
    {
        dragon1.x = -200;
    }

    dragon2.x += 5;

    if (dragon2.x > 1200)
    {
        dragon2.x = -300;
    }

}