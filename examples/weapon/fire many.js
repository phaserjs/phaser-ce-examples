
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

function preload() {

    //  Bullet Sprites from http://opengameart.org/content/bullet-collection-1-m484

    game.load.image('bullet', 'assets/bullets/bullet22.png');

}

var weapon;
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

    //  One 'set' of bullets, every second
    weapon.fireRate = 250;

    bulletPositions = [
        { x: 100, y: 600 },
        { x: 200, y: 550 },
        { x: 300, y: 500 },
        { x: 400, y: 450 },
        { x: 500, y: 500 },
        { x: 600, y: 550 },
        { x: 700, y: 600 }
    ];

    game.input.onDown.add(fire, this);

}

function fire () {

    weapon.fireMany(bulletPositions);

}

function render () {

    weapon.debug();

    game.debug.text('Click to fire', 600, 32);

}
