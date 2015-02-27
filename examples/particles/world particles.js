
// var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var emitter;

function preload() {

    game.load.image('sky', 'assets/pics/remember-me.jpg');
    game.load.image('leaf', 'assets/particles/leaf1.png');
    game.load.image('mushroom', 'assets/sprites/mushroom2.png');

}

function create() {

    game.world.setBounds(0, 0, 1920, 1200);

    game.physics.arcade.gravity.y = 100;

    var sky = game.add.image(0, 0, 'sky');

    cursors = game.input.keyboard.createCursorKeys();

    emitter = game.add.emitter(400, 100, 100);

    emitter.makeParticles('leaf');
    emitter.minParticleSpeed.setTo(-300, 30);
    emitter.maxParticleSpeed.setTo(300, 100);
    emitter.minParticleScale = 0.1;
    emitter.maxParticleScale = 0.5;
    emitter.gravity = 250;
    emitter.flow(2000, 500, 5, -1);

    game.input.onDown.add(dropSprite, this);
}

function dropSprite (pointer) {
    
    var m = game.add.sprite(pointer.worldX, pointer.worldY, 'mushroom');
    game.physics.arcade.enable(m);
    m.body.collideWorldBounds = true;

}

function update() {

    if (cursors.up.isDown)
    {
        game.camera.y -= 4;
    }
    else if (cursors.down.isDown)
    {
        game.camera.y += 4;
    }

    if (cursors.left.isDown)
    {
        game.camera.x -= 4;
    }
    else if (cursors.right.isDown)
    {
        game.camera.x += 4;
    }

}

function render() {

    game.debug.cameraInfo(game.camera, 32, 32);

}