
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });
var tween;
var prev = -400;
var t = Date.now();
var sprite;

function preload() {

    game.forceSingleUpdate = true;

    //  You can fill the preloader with as many assets as your game requires

    //  Here we are loading an image. The first parameter is the unique
    //  string by which we'll identify the image later in our code.

    //  The second parameter is the URL of the image (relative)
    game.load.image('einstein', 'assets/pics/ra_einstein.png');
    // game.load.image('einstein', 'assets/sprites/chunk.png');
}

function create() {

    sprite = game.add.sprite(-400, 0, 'einstein');
    // var sprite = game.add.sprite(0, 0, 'einstein');

    //  Here we create a tween on the sprite created above
    tween = game.add.tween(sprite);

    //  The object defines the properties to tween.
    //  In this case it will move to x 600
    //  The 6000 is the duration in ms - 6000ms = 6 seconds
    // tween.to({ x: 500, y: 500 }, 5000, 'Linear', true, 2000);
    tween.to({ x: 800 }, 5000, 'Linear', true, 0);

    //  And this starts it going
    // tween.start();

}

function update() {

    if (sprite.x < 800)
    {
        // sprite.x += 4;
    }

}

function render() {

    return;

    if (sprite.x < 800)
    {
        var ms = Date.now() - t;

        var d = window.dx - prev;

        if (ms > 20)
        {
            console.log('------------>', ms, d);
        }
        else
        {
            console.log(ms, d);
        }

        prev = window.dx;

        t = Date.now();
    }

    // game.debug.text(this.game.time.elapsedMS, 32, 32);
    // game.debug.text(window.dx, 32, 32);

}