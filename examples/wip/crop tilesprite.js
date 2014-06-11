
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });
// var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var tilesprite;

function preload() {

    game.load.image('pic', 'assets/pics/lance-overdose-loader_eye.png');
    game.load.spritesheet('sheet', 'assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);
    game.load.atlas('atlas', 'assets/sprites/seacreatures_json.png', 'assets/sprites/seacreatures_json.json');

}

var sprite1;
var sprite2;
var sprite3;

var crop1;
var crop2;
var crop3;

function create() {

    sprite1 = game.add.sprite(0, 0, 'sheet');
    sprite1.animations.add('walk');
    sprite1.animations.play('walk', 20, true);

    // sprite2 = game.add.sprite(300, 0, 'atlas', 'octopus0000');
    // sprite2.animations.add('swim', Phaser.Animation.generateFrameNames('octopus', 0, 24, '', 4), 30, true);
    // sprite2.animations.play('swim');

    // sprite3 = game.add.sprite(0, 300, 'pic');

    crop1 = new Phaser.Rectangle(1, 1, 24, 24);
    // crop2 = new Phaser.Rectangle(0, 0, 32, 32);
    // crop3 = new Phaser.Rectangle(16, 16, 100, 50);

    sprite1.crop(crop1);
    // sprite2.crop(crop2);
    // sprite3.crop(crop3);

    // console.log(sprite1.texture);

}

function update() {

}

function render() {

}
