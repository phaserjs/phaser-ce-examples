
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {


}

var sprite;

function create() {

	var timer = game.time.create(false);
    timer.onComplete.add(function(){ console.log('completed') } );
    timer.add(500, function(){ console.log('tick') } );
    timer.start();

}

function update() {


}

function render() {

}
