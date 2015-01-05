
var game = new Phaser.Game(800, 360, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

function preload() {

    game.load.image('mask', 'wip/mask.png');
    game.load.image('overlay', '/bbc-art-tools/source/skins/vanilla/images/tools/marker/overlay.png');

}

var sprite;

function create() {

    game.stage.backgroundColor = '#7d7d7d';

    var mask = this.game.make.sprite(0, 0, 'mask');
    var overlay = this.game.make.sprite(0, 0, 'overlay');

    //   Red

    var bmd = this.game.make.bitmapData(overlay.width, overlay.height);

    mask.tint = 0xff0000;

    bmd.draw(mask, 0, 0);
    bmd.draw(overlay, 0, 0);

    bmd.addToWorld(100, 100);

    //  Blue

    var bmd2 = this.game.make.bitmapData(mask.width, mask.height);

    mask.tint = 0x00ff;

    bmd2.draw(mask, 0, 0);
    bmd2.draw(overlay, 0, 0);

    bmd2.addToWorld(200, 100);


}

function render() {

    game.debug.text('Tint: ' + PIXI.CanvasTinter.canHandleAlpha, 32, 32);

}
