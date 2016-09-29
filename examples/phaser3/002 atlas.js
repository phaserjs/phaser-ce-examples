
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

function preload() {

    game.load.image('atlasImage', 'assets/sprites/phaser3-test1.png');
    game.load.json('atlasData', 'assets/sprites/phaser3-test1.json');

}

var manager;
var texture;
var frame;
var x = 0;
var y = 0;
var anchor = new Phaser.Point();

function create() {

    manager = new Phaser.TextureManager(game);

    texture = manager.create('atlasImage', game.cache.getImage('atlasImage'));

    Phaser.TextureManager.Parsers.JSONArray(texture, game.cache.getJSON('atlasData'));

    frame = texture.get('contra3');

    // console.log(texture);
    // console.log(texture.frames);
    console.log(frame);

}

function render () {

    var dx = frame.x - anchor.x * frame.width;
    var dy = frame.y - anchor.y * frame.height;

    game.context.drawImage(
        frame.source,
        frame.cutX,
        frame.cutY,
        frame.cutWidth,
        frame.cutHeight,
        x + dx,
        y + dy,
        frame.cutWidth,
        frame.cutHeight
    );

}
