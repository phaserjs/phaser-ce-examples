
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

var emitter;
var platform;

function preload() {

    game.load.spritesheet('balls', 'assets/sprites/balls.png', 17, 17);
    game.load.image('platform', 'assets/sprites/platform.png');

}

function create() {

    emitter = game.add.emitter(50, game.world.centerY - 200);
    emitter.bounce.setTo(1);
    emitter.setXSpeed(100, 200);
    emitter.setYSpeed(-50, 50);
    emitter.makeParticles('balls', 0, 250, true, true);

    platform = game.add.sprite(300, 500, 'platform');
    platform.width = 200;

    game.physics.arcade.enable(platform);

    platform.body.immovable = true;

    // explode, lifespan, frequency, quantity
    emitter.start(false, 5000, 20);

}

function update() {

    game.physics.arcade.collide(emitter, platform, change, null, this);

}

function change(platform, particle) {

    particle.kill();

}

