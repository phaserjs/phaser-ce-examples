
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('bullet', 'assets/bullets/bullet198.png');
    game.load.image('ship', 'assets/sprites/shmup-ship.png');

}

var sprite;
var weapon;
var cursors;
var fireButton;
var bulletPositions;

function create() {

    //  Creates the bullets, using the 'bullet' graphic
    weapon = game.add.weapon(6*8, 'bullet');

    //  The bullet will be automatically killed when it leaves the world bounds
    weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;

    //  Bullets live for 2 seconds
    weapon.bulletLifespan = 2000;

    //  Because our bullet is drawn facing up, we need to offset its rotation:
    weapon.bulletAngleOffset = 90;

    //  The speed at which the bullet is fired
    weapon.bulletSpeed = 400;

    // weapon.bulletAngleVariance = 20;

    sprite = this.add.sprite(320, 500, 'ship');

    game.physics.arcade.enable(sprite);

    //  Tell the Weapon to track the 'player' Sprite, offset by 14px horizontally, 0 vertically
    weapon.trackSprite(sprite, 14, 0);

    //  One 'set' of bullets, every second
    weapon.fireRate = 250;

    //  Tell the Weapon plugin it can fire more than once per game loop
    weapon.multiFire = true;

    cursors = this.input.keyboard.createCursorKeys();

    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    bulletPositions = [
        { x: 0, y: -32 },
        { x: -16, y: -16 },
        { x: 16, y: -16 },
        { x: -32, y: 0 },
        { x: 0, y: 0 },
        { x: 32, y: 0 }
    ];

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

    if (fireButton.isDown)
    {
        //  Fire 6 bullets in an arrow formation:
        weapon.fireMany(bulletPositions);
    }

}

function render() {

    weapon.debug();

}
