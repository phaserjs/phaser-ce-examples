var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.image('background','assets/tests/debug-grid-1920x1920.png');
    game.load.image('player','assets/sprites/phaser-dude.png');
}

var player;
var cursors;
var debugLine;
var debugLine2;

function create() {

    game.add.tileSprite(0, 0, 1920, 1920, 'background');
    game.world.setBounds(0, 0, 1920, 1920);

    game.physics.startSystem(Phaser.Physics.P2JS);

    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    game.physics.p2.enable(player);
    player.body.fixedRotation = true;
    cursors = game.input.keyboard.createCursorKeys();

    console.log(game.world.centerX, game.world.centerY);

    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.2, 0.2);

    debugLine = new Phaser.Line(0, 0, 0, game.camera.view.height);
    debugLine2 = new Phaser.Line(0, 0, game.camera.view.width, 0);
}

function update() {
    player.body.setZeroVelocity();

    if (cursors.up.isDown) {
        player.body.moveUp(300)
    }
    else if (cursors.down.isDown) {
        player.body.moveDown(300);
    }
    if (cursors.left.isDown) {
        player.body.velocity.x = -300;
    }
    else if (cursors.right.isDown) {
        player.body.moveRight(300);
    }

}

function render() {

    game.debug.text("x: " + game.camera.view.x, 32, 32);
    game.debug.text("y: " + game.camera.view.y, 32, 64);

    debugLine.centerOn(game.camera.view.centerX, game.camera.view.centerY);
    debugLine2.centerOn(game.camera.view.centerX, game.camera.view.centerY);

    game.debug.geom(debugLine, '#ff0000');
    game.debug.geom(debugLine2, '#ff0000');
}