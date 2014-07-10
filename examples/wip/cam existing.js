
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('atari', 'assets/sprites/atari130xe.png');

}

var sprite;

function create() {

    game.world.setBounds(0, 0, 1600, 1200);

    game.physics.startSystem(Phaser.Physics.ARCADE);

    sprite = game.make.sprite(500, 200, 'atari');

    game.physics.arcade.enable(sprite);

    game.camera.x = 100;

    game.add.existing(sprite);

    cursors = game.input.keyboard.createCursorKeys();

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
}
