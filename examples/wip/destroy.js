
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render }, false);

function preload() {

	game.load.image('pic', 'assets/pics/backscroll.png');
    game.load.spritesheet('button', 'assets/buttons/button_sprite_sheet.png', 193, 71);

}

var sprite;
var sprite2;
var g;
var p;

function create() {

	// game.stage.backgroundColor = '#ff5500';

	// game.renderer.useFillRect = false;

    sprite = game.add.button(game.world.centerX - 95, 400, 'button', tint, this, 2, 1, 0);
	// sprite = game.add.sprite(0.5, 0, 'pic');
	// sprite2 = game.add.sprite(0, 300, 'pic');

	// game.physics.enable(sprite);

	// sprite.inputEnabled = true;
	// sprite.events.onInputDown.add(tint, this);
	// sprite.events.onInputUp.add(wibble, this);

	// game.add.tween(sprite).to({y: 500}, 3000, Phaser.Easing.Linear.None, true);

	// p = new PIXI.Point(43, 45);

}

function tint() {

	sprite.destroy();
	// sprite.tint = Math.random() * 0xFFFFFF;
	// sprite2.tint = Math.random() * 0xFFFFFF;

}

function wibble() {

	console.log(sprite);

}

function update() {


}

function render() {

	// game.debug.text(sprite.position.y, 32, 32);

}
