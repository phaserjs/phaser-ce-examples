
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('beball', 'assets/sprites/beball1.png');
    game.load.image('bikkuriman', 'assets/sprites/bikkuriman.png');
    game.load.image('darkwing_crazy', 'assets/sprites/darkwing_crazy.png');

}

var sprites;
var tween;

function create() {

    game.stage.backgroundColor = '#2384e7';

    sprites = game.add.group();

    sprites.create(100, 100, 'beball');
    sprites.create(200, 100, 'bikkuriman');
    sprites.create(300, 100, 'darkwing_crazy');
    sprites.create(400, 100, 'beball');
    sprites.create(500, 100, 'bikkuriman');
    sprites.create(600, 100, 'darkwing_crazy');

    //  We will use the same reference over each time, rather than creating new ones
    tween = game.add.tween(sprites.cursor).to( { y: 500 }, 2000, Phaser.Easing.Bounce.Out, true);
    tween.onComplete.add(tween2, this);

}

function tween2() {

    sprites.next();

    //  The second tween alphs to nothing
    tween = game.add.tween(sprites.cursor).to( { alpha: 0 }, 2000, Phaser.Easing.Bounce.Out, true);
    tween.onComplete.add(tween3, this);

}

function tween3() {

    sprites.next();

    //  The third tween scales up
    tween = game.add.tween(sprites.cursor.scale).to( { x: 2, y: 2 }, 2000, Phaser.Easing.Bounce.Out, true);
    tween.onComplete.add(tween4, this);

}

function tween4() {

    sprites.next();

    //  The fourth tween does y pos + alpha
    tween = game.add.tween(sprites.cursor).to( { y: 500, alpha: 0.2 }, 2000, Phaser.Easing.Bounce.Out, true);
    tween.onComplete.add(tween5, this);

}

function tween5() {

    sprites.next();

    //  The fifth tween moves left
    tween = game.add.tween(sprites.cursor).to( { x: 100 }, 2000, Phaser.Easing.Bounce.Out, true);
    tween.onComplete.add(tween6, this);

}

function tween6() {

    sprites.next();

    //  The sixth tween moves left
    tween = game.add.tween(sprites.cursor).to( { x: 300, y: 400 }, 2000, Phaser.Easing.Bounce.Out, true);

}

