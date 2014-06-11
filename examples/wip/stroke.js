
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {


}

var sprite;

function create() {

    game.stage.backgroundColor = '#2d2d2d';

    this.hpText = this.game.add.text( this.game.world.centerX, this.game.world.centerY + 15, "aaaaa", { font: '20px Arial', fill: '#ffffff', stroke: '#000000', strokeThickness: 0 });
    this.hpText.anchor.set( 0.5, 0 );

    this.scoreText = this.game.add.text( this.game.world.centerX, this.game.world.centerY - 15, "bbbb", { font: '20px Arial', fill: '#ffffff', stroke: '#000000', strokeThickness: 0 });
    this.scoreText.anchor.set( 0.5, 0 );

}

function update() {


}

function render() {

}
