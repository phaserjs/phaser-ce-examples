var game = new Phaser.Game(640, 480, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render:render });

function preload() {

    game.load.spritesheet('gameboy', 'assets/sprites/gameboy_seize_color_40x60.png', 40, 60);

}

var sprite;
var cursors;

function create() {

    // game.enableStep();
    
    game.physics.startSystem(Phaser.Physics.ARCADE);

    sprite = game.add.sprite(400, 300, 'gameboy', 2);

    sprite.anchor.set(0.5);

    game.physics.arcade.enable(sprite);

    sprite.scale.set(2);

    // game.add.tween(sprite.scale).to( { x: 3, y: 3 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

    cursors = game.input.keyboard.createCursorKeys();

}

function update() {

    if (cursors.left.isDown)
    {
        sprite.scale.x = -0.7;
        sprite.body.velocity.x = -100;
    }
    else if (cursors.right.isDown)
    {
        sprite.scale.x = 0.7;
        sprite.body.velocity.x = 100;
    }
    else
    {
        sprite.body.velocity.x = 0;
    }

}

function render() {

    game.debug.body(sprite);

}
