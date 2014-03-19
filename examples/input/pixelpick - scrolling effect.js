
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.spritesheet('mummy', 'assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);
    game.load.image('stars', 'assets/misc/starfield.jpg');

}

var b;
var camSpeed = 4;
var s;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  Make our world big ...
    game.world.setBounds(0,0, 4000, 2000);

    //  Scrolling background
    s = game.add.tileSprite(0, 0, 4000, 600, 'stars');

    b = game.add.sprite(0, 300, 'mummy');

    game.physics.arcade.enable(b);

    b.scale.set(6);
    b.smoothed = false;
    b.animations.add('walk');
    b.animations.play('walk', 5, true);

    b.body.velocity.setTo(50, 0);

    //  Listen for input events on this sprite
    b.inputEnabled = true;

    //  Check the pixel data of the sprite
    b.input.pixelPerfectClick = true;

    b.events.onInputDown.add(tint, this);


}

function tint() {
    b.tint = Math.random() * 0xffffff;
}

function update() {

    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        game.camera.x -= camSpeed;

        if (!game.camera.atLimit.x)
        {
            s.tilePosition.x += camSpeed;
        }
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        game.camera.x += camSpeed;

        if (!game.camera.atLimit.x)
        {
            s.tilePosition.x -= camSpeed;
        }
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
    {
        game.camera.y -= camSpeed;

        if (!game.camera.atLimit.y)
        {
            s.tilePosition.y += camSpeed;
        }
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
    {
        game.camera.y += camSpeed;

        if (!game.camera.atLimit.y)
        {
            s.tilePosition.y -= camSpeed;
        }
    }

}

function render() {

    game.debug.spriteInputInfo(b, 32, 32);

}
