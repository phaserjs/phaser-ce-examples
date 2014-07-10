
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {
    game.load.image('pineapple', 'assets/sprites/pineapple.png');

}

var pineapples;

function create() {

    pineapples = game.add.group();
    pineapples.enableBody = true;
    pineapples.physicsBodyType = Phaser.Physics.ARCADE;

    for (var i = 0; i < 10; i++)
    {
        var pineapple = pineapples.create(200 + i * 48,50, 'pineapple');

        //This allows your sprite to collide with the world bounds like they were rigid objects
        pineapple.body.collideWorldBounds=true;
        pineapple.body.gravity.x = game.rnd.integerInRange(-50, 50);
        pineapple.body.gravity.y = 100 + Math.random() * 100;
        pineapple.body.bounce.setTo(0.9, 0.9);
    }

}
