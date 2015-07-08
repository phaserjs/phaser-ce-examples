
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create, update: update });

function create() {

    var bmd = game.make.bitmapData();

    var data = [
        ' 333 ',
        ' 777 ',
        'E383E',
        ' 333 ',
        ' 3 3 '
    ];

    bmd.generate(data);

    bmd.addToWorld();

}

function update() {


}
