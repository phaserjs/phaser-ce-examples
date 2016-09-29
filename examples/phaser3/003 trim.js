
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

function preload() {

    game.load.image('hello', 'assets/sprites/hello.png');
    game.load.image('atlasImage', 'assets/sprites/phaser3-test1.png');
    game.load.json('atlasData', 'assets/sprites/phaser3-test1.json');

}

var manager;
var texture;
var frame;
var x = 0;
var y = 0;

function create() {

    manager = new Phaser.TextureManager(game);

    texture = manager.create('atlasImage', game.cache.getImage('atlasImage'));

    Phaser.TextureManager.Parsers.JSONArray(texture, game.cache.getJSON('atlasData'));

    frame = texture.get('hello');

    var sprite = game.add.sprite(0, 0, 'hello');

    // x = sprite.width;

    // console.log(texture);
    // console.log(texture.frames);
    console.log(frame);

}

function render () {

    game.context.drawImage(
        frame.source,
        frame.x,
        frame.y,
        frame.width,
        frame.height,
        x + frame.data.spriteSourceSize.x,
        y + frame.data.spriteSourceSize.y,
        frame.width,
        frame.height
    );

}
