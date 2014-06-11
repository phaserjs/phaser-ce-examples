
// var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.atlas('atlas', 'assets/sprites/seacreatures_json.png', 'assets/sprites/seacreatures_json.json');
    game.load.image('test', 'assets/sprites/atari130xe.png');

}

var atari;
var sprite;
var r;

function create() {

    r = new Phaser.Rectangle(0, 0, 64, 100);

    atari = game.add.sprite(200, 200, 'test');
    atari.crop(r);


    sprite = game.add.sprite(400, 200, 'atlas', 'greenJellyfish0000');
    sprite.animations.add('swim', Phaser.Animation.generateFrameNames('greenJellyfish', 0, 38, '', 4), 20, true);
    sprite.animations.play('swim');
    sprite.crop(r);

    game.input.onDown.add(updateCrop, this);

}

function updateCrop() {

    // r.x += 1;

    r.width += 2;

    // atari.crop(r);
    // sprite.crop(r);

    sprite.updateCrop();
    atari.updateCrop();

}

function update() {
}

function render() {

    game.debug.text(r.x.toString(), 32, 32);

    game.debug.text(atari.texture.frame.x.toString(), 32, 64);
    game.debug.text(atari._cache[9].toString(), 32, 96);

    // game.debug.text(sprite.texture.frame.x.toString(), 32, 64);
    // game.debug.text(sprite._cache[9].toString(), 32, 96);

}
