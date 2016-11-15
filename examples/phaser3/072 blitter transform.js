
var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    this.load.image('logo', 'assets/sprites/phaser.png');

}

var blitter;

function create() {

    blitter = this.add.blitter();

    blitter.createFromCallback(placeBob.bind(this), 200, 'logo');

    blitter.x = 400;
    blitter.y = 300;
    blitter.pivotX = 400;
    blitter.pivotY = 300;

    this.add.tween(blitter).to({ angle: 360, scale: 2 }, 4000, 'Sine.easeInOut', true, 0, -1, true);

}

function placeBob(bob) {

    bob.x = Phaser.Math.between(-60, 860);
    bob.y = Phaser.Math.between(-60, 600);

    bob.scale = Phaser.Math.random(0.1, 1);

}

function update(delta) {
}
