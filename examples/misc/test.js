
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.json('map', 'assets/test.json');

}

function create() {

    var obj = Phaser.TilemapParser.parseTiledJSON(game.cache.getJSON('map'));
    console.log(obj);

}

function update () {

}

function render () {

}
