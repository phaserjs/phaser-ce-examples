
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('ship', 'assets/sprites/thrust_ship.png');
    game.load.spritesheet('bullet', 'assets/sprites/rgblaser.png', 4, 4);

}

var sprite;
var weapon;
var cursors;

function create() {

    //  Creates 30 bullets, using the 'bullet' graphic
    weapon = game.add.weapon(40, 'bullet');

    //  The 'rgblaser.png' is a Sprite Sheet with 80 frames in it (each 4x4 px in size)
    //  The 3rd argument tells the Weapon Plugin to advance to the next frame each time
    //  a bullet is fired, when it hits 80 it'll wrap to zero again.
    //  You can also set this via this.weapon.bulletFrameCycle = true
    weapon.setBulletFrames(0, 80, true);

    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

    //  The speed at which the bullet is fired
    weapon.bulletSpeed = 400;

    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 50ms
    weapon.fireRate = 100;

    //  Set the weapon to autofire - you can toggle this on and off during play as well
    weapon.autofire = true;

    sprite = this.add.sprite(400, 300, 'ship');

    sprite.anchor.set(0.5);

    game.physics.arcade.enable(sprite);

    sprite.body.drag.set(70);
    sprite.body.maxVelocity.set(200);

    //  Tell the Weapon to track the 'player' Sprite
    //  With no offsets from the position
    //  But the 'true' argument tells the weapon to track sprite rotation
    weapon.trackSprite(sprite, 0, 0, true);

    cursors = this.input.keyboard.createCursorKeys();

}

function update() {

    //  Press UP and DOWN to toggle autofire
    if (cursors.up.isDown)
    {
        weapon.autofire = true;
    }
    else if (cursors.down.isDown)
    {
        weapon.autofire = false;
    }

    if (cursors.left.isDown)
    {
        sprite.body.angularVelocity = -300;
    }
    else if (cursors.right.isDown)
    {
        sprite.body.angularVelocity = 300;
    }
    else
    {
        sprite.body.angularVelocity = 0;
    }

    game.world.wrap(sprite, 16);

}

function render() {

    weapon.debug();

}
