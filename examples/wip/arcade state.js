
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('p1', 'assets/sprites/asuna_by_vali233.png');
    game.load.image('p2', 'assets/sprites/kirito_by_vali233.png');

}

function create() {

    console.log('State Create');

    game.stage.backgroundColor = 0x4488cc;

    // Define game world size for player boundaries
    game.world.setBounds(0, 0, game.width, 1000);
    game.physics.arcade.setBoundsToWorld();

    // Reset camera. Don't bind the camera to the world.
    // These 2 lines make no difference, still works without them
    game.camera.setBoundsToWorld();
    game.camera.y = -game.height/2;

    var p1 = game.add.sprite(50, 50, 'p1');
    game.physics.arcade.enable(p1);
    p1.body.collideWorldBounds = true;

    var p2 = game.add.sprite(150, 50, 'p2');
    game.physics.arcade.enable(p2);
    p2.body.collideWorldBounds = false;

}

function update() {

    game.camera.y += 100 * game.time.physicsElapsed;

    if (this.input.activePointer.isDown)
    {
        game.state.restart();
    }

}
