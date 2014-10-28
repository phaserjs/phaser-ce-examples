
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('bikkuriman', 'assets/sprites/bikkuriman.png');

}

var sprite;
var tween;

function create() {

    game.stage.backgroundColor = '#2384e7';

    sprite = game.add.sprite(400, 100, 'bikkuriman');

    tween = game.add.tween(sprite).to( { y: 500 }, 2000, Phaser.Easing.Bounce.Out, true);
    tween.onComplete.addOnce(tween2, this);

    //  Notice the use of addOnce above. If you don't use that then you *must* do:
    // tween.onComplete.removeAll();
    //  before using the tween again, or it will fire both onComplete callbacks.

}

function tween2() {

    tween.to( { alpha: 0.5 }, 2000, Phaser.Easing.Bounce.Out, true);
    tween.onComplete.addOnce(tween3, this);

}

function tween3() {

    tween.to( { x: 2, y: 2 }, 2000, Phaser.Easing.Bounce.Out, true);
    tween.onComplete.addOnce(tween4, this);

}

function tween4() {

    tween.to( { y: 500, alpha: 1 }, 2000, Phaser.Easing.Bounce.Out, true);
    tween.onComplete.addOnce(tween5, this);

}

function tween5() {

    tween.to( { x: 400, y: 100, alpha: 1 }, 2000, Phaser.Easing.Bounce.Out, true);
    tween.onComplete.addOnce(tween2, this);

}
