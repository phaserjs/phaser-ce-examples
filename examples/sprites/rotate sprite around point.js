
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', this);

function preload() {

    game.load.image('ship', 'assets/sprites/shmup-ship2.png');
    game.load.image('ball', 'assets/sprites/blue_ball.png');

}

var ship;
var orb;
var cursors;

function create() {

    game.stage.backgroundColor = '#001255';

    ship = game.add.sprite(400, 300, 'ship');
    ship.anchor.setTo(0.5, 0.5);

    game.physics.arcade.enable(ship);

    orb = game.add.sprite(400, 300, 'ball');
    orb.anchor.setTo(0.5, 0.5);

    cursors = game.input.keyboard.createCursorKeys();

}

function update() {

    ship.body.velocity.x = 0;
    ship.body.velocity.y = 0;

    if (cursors.left.isDown)
    {
        ship.body.velocity.x = -300;
    }
    else if (cursors.right.isDown)
    {
        ship.body.velocity.x = 300;
    }

}

function preRender() {

    orb.position.rotate(ship.x, ship.y, 2, true, 100);

}