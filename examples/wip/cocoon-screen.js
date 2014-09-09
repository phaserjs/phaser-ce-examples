var cfg = {

    width: "100%",
    height: "100%",
    renderer: Phaser.CANVAS,
    state: { preload: preload, create: create, update: update, render: render },

}

var game = new Phaser.Game(cfg);
var c = 0;

function preload() {

    game.load.image('bunny', '/phaser-examples/examples/assets/sprites/wabbit.png');

}

function create() {

    game.stage.backgroundColor = '#3d44ef';
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.physics.arcade.gravity.y = 500;

    for (var i = 0; i < 10; i++)
    {
        spawn();
    }

}

function spawn() {

    var b = game.add.sprite(0, 0, 'bunny');

    game.physics.arcade.enable(b);

    b.body.collideWorldBounds = true;
    b.body.bounce.set(1);
    b.body.velocity.x = game.rnd.integerInRange(300, 800);

    c++;

}

function update() {

    if (game.input.activePointer.isDown)
    {
        spawn();
    }

}

function render() {

    game.debug.text("Z Bunnies: " + c, 32, 100);

}
