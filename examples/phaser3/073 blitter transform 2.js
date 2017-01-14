
var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    this.load.image('ball', 'assets/demoscene/blue_ball.png');

}

var blitter;
var x = 0;
var y = 0;
var i = 0;
var t = 16;

function create() {

    blitter = this.add.blitter();

    blitter.createFromCallback(placeBob.bind(this), t * 7, 'ball');

}

function placeBob(bob) {

    if (i % 16 === 0)
    {
        x += 96;
        y = 0;
    }

    y += 32;

    bob.x = x + (Math.sin(y) * 16);
    bob.y = y;
    bob.anchor = 0.5;

    i++;
}

function update(delta) {
}
