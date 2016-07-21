var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('atari', 'assets/sprites/atari800xl.png');
    game.load.image('backdrop', 'assets/pics/remember-me.jpg');

}

var sprite;
var text;

function create() {

    game.renderer.renderSession.roundPixels = true;
    game.camera.roundPx = true;

    game.world.setBounds(0, 0, 1920, 1200*2);

    game.add.sprite(0, 0, 'backdrop');
    game.add.sprite(0, 1200, 'backdrop');

    text = game.add.text(130, 8, "Jittery :(");
    text.fill = '#ff00ff';

    sprite = game.add.sprite(300, 0, 'atari');
    sprite.addChild(text);

    //  Either uncomment this, and comment-out the 2 lines in the 'update' function
    //  Or leave this commented out, and use the 'update' method instead. Just don't have both.

    game.add.tween(sprite).to({ y: game.world.height }, 6000).start().loop(true);

    // game.physics.arcade.enable(sprite);

    // sprite.body.velocity.y = 200;

    game.camera.follow(text);
    // game.camera.follow(sprite);

}

function update() {

    // sprite.y += 6;
    // sprite.y += 2;
    // if (sprite.y > game.world.height) { sprite.y = 0; }

}

function render() {

    game.debug.text(sprite.y, 32, 32);
    game.debug.text(game.camera.y, 320, 32);

}