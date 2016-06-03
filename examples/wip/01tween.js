var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('atari', 'assets/sprites/atari800xl.png');
    game.load.image('backdrop', 'assets/pics/remember-me.jpg');

}

var sprite;
var text;

function create() {

    game.world.setBounds(0, 0, 1920, 1200*2);

    game.add.sprite(0, 0, 'backdrop');
    game.add.sprite(0, 1200, 'backdrop');

    text = game.add.text(130, 8, "Jittery :(");
    text.fill = '#ff00ff';

    sprite = game.add.sprite(300, 0, 'atari');
    sprite.addChild(text);

    //  Either uncomment this, and comment-out the 2 lines in the 'update' function
    //  Or leave this commented out, and use the 'update' method instead. Just don't have both.

    // game.add.tween(sprite).to({ y: game.world.height }, 3000).start().loop(true);

    game.camera.follow(sprite);

}

function update() {

    sprite.y += 10;
    if (sprite.y > game.world.height) { sprite.y = 0; }

}

function render() {

    game.debug.text(sprite.y, 32, 32);
    game.debug.text(text.y, 320, 32);

}