
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('ball', 'assets/sprites/pangball.png');

}

function create() {

    //  Enable p2 physics
    game.physics.startSystem(Phaser.Physics.P2JS);

    game.stage.backgroundColor = '#124184';

    game.physics.p2.gravity.y = 100;
    game.physics.p2.restitution = 1.0;

    var group = game.add.physicsGroup(Phaser.Physics.P2JS);

    for (var i = 0; i < 32; i++)
    {
        var ball = group.create(game.world.randomX, game.rnd.between(0, 100), 'ball');
        ball.body.setCircle(16);
        ball.body.fixedRotation = true;
    }

}
