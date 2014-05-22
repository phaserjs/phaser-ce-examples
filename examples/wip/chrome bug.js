
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });
// var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('ball', 'assets/sprites/shinyball.png');

}

var bmd;
var canvas;
var context;
var baseTexture;
var texture;
var sprite;

function create() {

    canvas = document.createElement("canvas");
    // canvas.width = 800;
    // canvas.height = 200;
    context = canvas.getContext("2d");

    context.fillStyle = 'rgba(255, 255, 255, 1)';
    context.font = '28px Courier';
    context.fillText('x: starting', 64, 64);

    baseTexture = new PIXI.BaseTexture(canvas);
    texture = new PIXI.Texture(baseTexture);

	sprite = game.add.sprite(0, 0, texture);


/*	bmd = game.add.bitmapData(800, 600);

	bmd.context.fillStyle = 'rgba(255, 255, 255, 1)';
	bmd.context.font = '28px Courier';
	bmd.context.fillText('x: starting', 64, 64);

	game.add.sprite(0, 0, bmd);
*/
}

function update() {

    context.clearRect(0, 0, 600, 400);
    context.fillText('x: ' + game.time.now.toString(), 64, 64);

    PIXI.updateWebGLTexture(baseTexture, game.renderer.gl);

	// bmd.context.clearRect(0, 0, this.game.width, this.game.height);
	// bmd.context.fillText('x: ' + game.input.x.toString(), 64, 64);
	// bmd.dirty = true;
	// PIXI.updateWebGLTexture(this.baseTexture, this.game.renderer.gl);


}

