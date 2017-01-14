
var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example', { preload: preload, create: create });

function preload() {

    this.load.image('logo', 'assets/sprites/phaser.png');

}

var blitter;

function create() {

    blitter = this.add.blitter();

    var bob = blitter.create(100, 100, 'logo');

    console.log(bob);

}
