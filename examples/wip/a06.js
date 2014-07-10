
// var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.atlas('atlas', 'assets/sprites/seacreatures_json.png', 'assets/sprites/seacreatures_json.json');
    game.load.image('test', 'assets/sprites/atari130xe.png');
    game.load.image('pic', 'assets/pics/giant.png');

}

var sprite;
var r;

function create() {

    r = new Phaser.Rectangle(0, 0, 320, 10);

    sprite = game.add.image(400, 200, 'atlas', 'greenJellyfish0000');
    // sprite.animations.add('swim', Phaser.Animation.generateFrameNames('greenJellyfish', 0, 38, '', 4), 20, true);
    // sprite.animations.play('swim');

    sprite.crop(r);

    game.input.onDown.add(updateCrop, this);

}

function updateCrop() {

    // r.width += 4;

    r.height += 4;

    // r.y += 2;

    sprite.updateCrop();

}

function update() {

    // sprite.rotation += 0.01;

}

function render() {

    // game.debug.geom(atari.getBounds());
    game.debug.spriteInfo(sprite, 32, 32);

    // game.debug.text(atari.texture.frame.x.toString(), 32, 64);
    // game.debug.text(atari._cache[9].toString(), 32, 96);

    // game.debug.text(sprite.texture.frame.x.toString(), 32, 64);
    // game.debug.text(sprite._cache[9].toString(), 32, 96);

}
