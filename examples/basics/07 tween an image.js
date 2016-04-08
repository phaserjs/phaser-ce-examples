var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.forceSingleUpdate = true;

    //  You can fill the preloader with as many assets as your game requires

    //  Here we are loading an image. The first parameter is the unique
    //  string by which we'll identify the image later in our code.

    //  The second parameter is the URL of the image (relative)
    game.load.image('einstein', 'assets/pics/ra_einstein.png');
}

function create() {

    var sprite = game.add.sprite(-400, 0, 'einstein');

    //  Here we create a tween on the sprite created above
    var tween = game.add.tween(sprite);

    //  The object defines the properties to tween.
    //  In this case it will move to x 800
    //  The 5000 is the duration in ms - 5000ms = 5 seconds
    tween.to({ x: 800 }, 5000, 'Linear', true, 0);

}
