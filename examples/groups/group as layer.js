
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

function preload() {

    game.world.setBounds(0, 0, 1280, 800);

    game.load.image('ground', 'assets/tests/ground-2x.png');
    game.load.image('river', 'assets/tests/river-2x.png');
    game.load.image('sky', 'assets/tests/sky-2x.png');
    game.load.image('cloud0', 'assets/tests/cloud-big-2x.png');
    game.load.image('cloud1', 'assets/tests/cloud-narrow-2x.png');
    game.load.image('cloud2', 'assets/tests/cloud-small-2x.png');

    game.load.spritesheet('ufo', 'assets/sprites/ufo.png', 24, 21);
    
}

function create() {

    // Create the sky layer, behind everything and donot move.
    var skyLayer = game.add.group();

    // Create the cloud layer, only beyond the sky.
    var cloudLayer = game.add.group();

    // Create the ground, behind the river and beyond clouds.
    var groundLayer = game.add.group();

    // Create the sprite layer. This should behind the river,
    // and beyond the ground, cloud and sky layer.
    var spriteLayer = game.add.group();

    // Create the river layer, beyond everything.
    var riverLayer = game.add.group();

    // Add sky background to skyLayer.
    var sky = skyLayer.create(0, 0, 'sky');

    // Add clouds to cloudLayer.
    var cloud0 = cloudLayer.create(200, 120, 'cloud0');
    var cloud1 = cloudLayer.create(-60, 120, 'cloud1');
    var cloud2 = cloudLayer.create(900, 170, 'cloud2');

    // Add ground sprite to groundLayer.
    var ground = groundLayer.create(0, 360, 'ground');

    // Add river to riverLayer.
    var river = riverLayer.create(0, 400, 'river');

    // Add sprites to spriteLayer.
    var ufo = spriteLayer.create(360, 240, 'ufo');
    ufo.anchor.setTo(0.5);

}

function render() {
    
    game.debug.text('sky layer:    z = 0', 16, 20);
    game.debug.text('cloud layer:  z = 1', 16, 36);
    game.debug.text('ground layer: z = 2', 16, 52);
    game.debug.text('sprite layer: z = 3', 16, 68);
    game.debug.text('river layer:  z = 4', 16, 84);
    
}
