
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });
// var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('ball', 'assets/sprites/pangball.png');

}

var image1;
var image2;

var speed = 100;

function create() {

    game.stage.backgroundColor = '#6d6d6d';

    image1 = game.add.sprite(0, 100, 'ball');

    image2 = game.add.sprite(0, 150, 'ball');
    image2.interpolate = false;


    // game.physics.arcade.enable(image);

    // game.input.onDown.addOnce(function() {

        // image.body.velocity.x = 100;

    // });

}

function update() {

    image1.x += speed * game.mainloop.physicsStep;
    image2.x += speed * game.mainloop.physicsStep;

    if (image1.x > 800)
    {
        speed *= -1;
    }
    else if (image1.x < 0)
    {
        speed *= -1;
    }

}