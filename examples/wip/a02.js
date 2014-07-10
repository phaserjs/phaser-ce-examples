
// var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.spritesheet('mummy', 'assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);
    game.load.image('star', 'assets/sprites/bullet.png');
    game.load.image('test', 'assets/sprites/atari130xe.png');
    game.load.atlas('atlas', 'assets/sprites/seacreatures_json.png', 'assets/sprites/seacreatures_json.json');

}

var mummy1;
var mummy2;
var sprite2;
var sprite3;
var sprite4;
var r;

function create() {

    game.add.sprite(0, 0, 'test');

    // mummy1 = game.add.sprite(0, 0, 'mummy', 0);
    // mummy2 = game.add.sprite(600, 200, 'mummy', 0);

    // mummy1.animations.add('walk');
    // mummy1.play('walk', 10, true);

    // mummy2.animations.add('walk');
    // mummy2.play('walk', 20, true);

    // mummy1.crop(new Phaser.Rectangle(16, 0, 16, 32));


    //  WORKS :)
    // var bmd = game.make.bitmapData(400, 400);
    // bmd.rect(0, 0, 400, 400, 'rgba(200,200,0,0.8)');
    // var bob = bmd.addToWorld(100, 100);
    // bob.crop(new Phaser.Rectangle(0, 0, 200, 100));

    //  WORKS :)
    // var star = game.make.sprite(0, 0, 'star');
    // var texture1 = game.add.renderTexture(400, 400, 'texture1');

    // for (var i = 0; i < 500; i++)
    // {
    //     texture1.renderXY(star, game.rnd.between(1, 400), game.rnd.between(1, 400), false);
    // }

    // var rt = game.add.sprite(0, 0, texture1);

    // rt.crop(new Phaser.Rectangle(0, 0, 200, 200));

    //  Texture Atlas

    // var sprite2 = game.add.sprite(300, 200, 'atlas', 'octopus0000');


    var sprite3 = game.add.sprite(0, 0, 'atlas', 'greenJellyfish0000');

    sprite3.animations.add('swim', Phaser.Animation.generateFrameNames('greenJellyfish', 0, 38, '', 4), 20, true);
    sprite3.animations.play('swim');



    sprite2 = game.add.sprite(0, 200, 'atlas', 'greenJellyfish0000');

    sprite2.animations.add('swim', Phaser.Animation.generateFrameNames('greenJellyfish', 0, 38, '', 4), 20, true);
    sprite2.animations.play('swim');

    // sprite2.x = 60;
    // sprite2.crop(new Phaser.Rectangle(60, 0, 60, 100));

    // sprite2.x = 0;
    // sprite2.crop(new Phaser.Rectangle(0, 0, 60, 100));

    // sprite2.x = 0;
    // sprite2.scale.set(0.5);
    // sprite2.anchor.x = 1;

    r = new Phaser.Rectangle(0, 0, 30, 30);
    sprite2.crop(r);

    sprite4 = game.add.sprite(400, 200, 'atlas', 'greenJellyfish0000');
    sprite4.animations.add('swim', Phaser.Animation.generateFrameNames('greenJellyfish', 0, 38, '', 4), 20, true);
    sprite4.animations.play('swim');
    // sprite4.crop(r);




}

function update() {

    // if (r.x < 120)
    // {
        // r.x += 0.5;
        // sprite4.crop(r);
    // }

}

function render() {

}
