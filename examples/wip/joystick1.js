
var game = new Phaser.Game(1000, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('test', 'assets/sprites/wizball.png');
    game.load.image('starfield', 'assets/misc/starfield.jpg');

}

var sprite;
var joystick;
var tilesprite;

function create() {

	Phaser.Canvas.setTouchAction(game.canvas, 'none');
	Phaser.Canvas.setUserSelect(game.canvas, 'none');

	game.input.mouse.capture = true;
	game.input.touch.capture = true;

	joystick = game.plugins.add(Phaser.Plugin.VirtualJoystick, 900, 500);

    tilesprite = game.add.tileSprite(0, 0, game.width, game.height, 'starfield');

	sprite = game.add.sprite(200, 200, 'test');

    game.physics.arcade.enable(sprite);

}

function update() {

    joystick.setVelocity(sprite, 0, 200);

    tilesprite.tilePosition.x += (2 * joystick.deltaX);
    tilesprite.tilePosition.y += (2 * joystick.deltaY);

}

function render() {

    game.debug.text('force: ' + joystick.force, 32, 32);
    game.debug.text('distane: ' + joystick.distance, 32, 64);
    game.debug.text('angle: ' + joystick.angle, 32, 96);

    game.debug.text('delta x: ' + joystick.deltaX, 32, 128);
    game.debug.text('delta y: ' + joystick.deltaY, 32, 160);

}
