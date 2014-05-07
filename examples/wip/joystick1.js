
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

	game.load.image('test', 'assets/sprites/wizball.png');

}

var sprite;
var joystick;

function create() {

	Phaser.Canvas.setTouchAction(game.canvas, 'none');
	Phaser.Canvas.setUserSelect(game.canvas, 'none');

	game.input.mouse.capture = true;
	game.input.touch.capture = true;

	joystick = game.plugins.add(Phaser.Plugin.VirtualJoystick, 500, 500);

	// sprite = game.add.sprite(200, 200, 'test');

}

function update() {


}

function render() {

}
