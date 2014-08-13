
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.spritesheet('mummy', 'assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);

}

var mummy;
var tween;

function create() {

	game.stage.backgroundColor = 0x3d4d3d;

    mummy = game.add.sprite(300, 300, 'mummy', 5);

    tween = this.game.add.tween(mummy);

    var tweenDuration = 2000;

    tween.to( { x : "+100" }, tweenDuration, Phaser.Easing.Linear.None, true);
    tween.to( { x : "+100", y: "+100" }, tweenDuration, Phaser.Easing.Linear.None, true, tweenDuration);
 
}

function update() {

}

function render() {
	
}