
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('pic', 'assets/pics/acryl_bladerunner.png');

}

function create() {

    //  This simply creates an Image using the picture we loaded above and positions it at 100 x 100

    //  The difference between an Image and a Sprite is that you cannot animate or add a physics body to an Image

    var image = game.add.image(100, 100, 'pic');

}
