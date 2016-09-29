
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

function preload() {

    game.load.image('scroll', 'assets/pics/trsipic1_lazur.jpg');

}

var manager;
var texture;
var frame;
var x = 0;
var y = 0;
var c = 0;
var anchor = new Phaser.Point();

function create() {

    manager = new Phaser.TextureManager(game);

    texture = manager.create('scroll', game.cache.getImage('scroll'));

    // Phaser.TextureManager.Parsers.JSONArray(texture, game.cache.getJSON('atlasData'));

    frame = texture.get();

    //  w, h, x, y
    //  undefined = defaults
    frame.crop(c);

    // console.log(texture);
    // console.log(texture.frames);
    console.log(frame);

}

function render () {

    var dx = frame.x - anchor.x * frame.width;
    var dy = frame.y - anchor.y * frame.height;

    var tx = x;
    var ty = y;

    var cx = frame.cutX;
    var cy = frame.cutY;
    var cw = frame.cutWidth;
    var ch = frame.cutHeight;

    var resolution = 1;

    game.context.setTransform(1, 0, 0, 1, tx, ty);

    game.context.drawImage(frame.source, cx, cy, cw, ch, dx, dy, cw / resolution, ch / resolution);

    c++;

    if (c === frame.realHeight)
    {
        c = 0;
    }

    frame.crop(frame.realWidth, c);

}
