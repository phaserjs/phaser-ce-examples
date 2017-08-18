var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { init: init, preload: preload, create: create, update: update });
// var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var lastPos;
var pan = false;

function init () {

    game.add.plugin(Phaser.Plugin.Tiled);

}

function preload () {

    // game.load.pack('Ortho_1_16__16_large.json', '/phaser-tiled/testmaps/maps/tilemap-assets2.json', null, this);
    game.load.pack('Ortho_1_32__32_objects.json', '/phaser-tiled/testmaps/maps/tilemap-assets2.json', null, this);

}

function create () {

    // var map = game.add.tiledmap('Ortho_1_16__16_large.json');
    var map = game.add.tiledmap('Ortho_1_32__32_objects.json');

    map.spawnObjects(function (obj) {

        if (obj.type !== Phaser.SPRITE) return;

        obj.inputEnabled = true;
        obj.input.enableDrag();

    });

    lastPos = new Phaser.Point();
}

function update () {

    if (game.input.mousePointer.active)
    {
        moveCamera(game.input.mousePointer);
    }

    if (game.input.pointer1.active)
    {
        moveCamera(game.input.pointer1);
    }

}

function moveCamera (pointer) {

    if (!pointer.timeDown) return;

    if (pointer.isDown && !pointer.targetObject)
    {
        if (pan)
        {
            game.camera.x += lastPos.x - pointer.position.x;
            game.camera.y += lastPos.y - pointer.position.y;
        }

        lastPos.copyFrom(pointer.position);
        pan = true;
    }

    if (pointer.isUp)
    {
        pan = false;
    }
}
