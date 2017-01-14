
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('bullet', 'assets/sprites/bullet.png');
    game.load.image('ship', 'assets/sprites/shmup-ship.png');

}

var sprite;
var weapon;
var cursors;
var fireButton;

function create() {

    //  Creates 40 bullets, using the 'bullet' graphic
    weapon = game.add.weapon(40, 'bullet');

    //  The bullets will be automatically killed when they leave the world bounds
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

    //  Because our bullet is drawn facing up, we need to offset its rotation:
    weapon.bulletAngleOffset = 90;

    //  The speed at which the bullets are fired
    weapon.bulletSpeed = 400;

    sprite = this.add.sprite(320, 500, 'ship');

    game.physics.arcade.enable(sprite);

    cursors = this.input.keyboard.createCursorKeys();

    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

}

function update() {

    sprite.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        sprite.body.velocity.x = -200;
    }
    else if (cursors.right.isDown)
    {
        sprite.body.velocity.x = 200;
    }

    var x = sprite.x;
    var y = sprite.y;

    if (fireButton.isDown)
    {
        weapon.fireRate = 0;
        weapon.fire({ x: x, y: y });
        weapon.fire({ x: x + 10, y: y });
        weapon.fire({ x: x + 20, y: y });
        weapon.fire({ x: x + 30, y: y });
    }
    
    weapon.fireRate = 200;

}

function render() {

    weapon.debug();

}
