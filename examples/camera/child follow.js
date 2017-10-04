
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, preRender: preRender });

function preload() {

    game.load.image('backdrop', 'assets/pics/remember-me.jpg');
    game.load.image('player','assets/sprites/square1.png');
    game.load.image('target','assets/sprites/square2.png');

}

var player;
var target;
var cursors;

function create() {

    game.add.sprite(0, 0, 'backdrop');

    game.world.setBounds(0, 0, 1920, 1200);

    game.physics.startSystem(Phaser.Physics.P2JS);

    player = game.add.sprite(300, 300, 'player');
    target = game.add.sprite(300, 300, 'target');

    player.anchor.set(0.5);
    target.anchor.set(0.5);

    game.physics.p2.enable(player);

    cursors = game.input.keyboard.createCursorKeys();

    game.camera.follow(target);

}

function update() {

    player.body.setZeroVelocity();

    if (cursors.up.isDown)
    {
        player.body.moveUp(300)
    }
    else if (cursors.down.isDown)
    {
        player.body.moveDown(300);
    }

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -300;
    }
    else if (cursors.right.isDown)
    {
        player.body.moveRight(300);
    }

}

function preRender() {

    target.x = player.x;
    target.y = player.y;
    target.updateTransform();

    //  Optional:
    game.camera.updateTarget();
    game.stage.updateTransform();

}
