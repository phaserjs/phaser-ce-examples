
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

}

function create() {

    // create a new bitmap data object
    var bmd = game.add.bitmapData(128,128);

    // draw to the canvas context like normal
    bmd.ctx.beginPath();
    bmd.ctx.rect(0,0,128,128);
    bmd.ctx.fillStyle = '#ff0000';
    bmd.ctx.fill();

    // use the bitmap data as the texture for the sprite
    var sprite = game.add.sprite(200, 200, bmd);
}
