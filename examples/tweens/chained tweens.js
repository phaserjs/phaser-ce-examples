
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('diamond', 'assets/sprites/diamond.png');

}

var tween;

function create() {

    game.stage.backgroundColor = 0x2d2d2d;

    var sprite = game.add.sprite(100, 100, 'diamond');

    //  Here we'll chain 4 different tweens together and play through them all in a loop
    // var tween = game.add.tween(sprite).to({ x: 600 }, 2000, Phaser.Easing.Linear.None)
    // .to({ y: 300 }, 1000, Phaser.Easing.Linear.None)
    // .to({ x: 100 }, 2000, Phaser.Easing.Linear.None)
    // .to({ y: 100 }, 1000, Phaser.Easing.Linear.None)
    // .loop()
    // .start();

    // var tween = game.add.tween(sprite).to({ x: 600 }, 2000, Phaser.Easing.Linear.None)
    // .to({ y: 300 }, 1000, Phaser.Easing.Linear.None)
    // .to({ x: 100 }, 2000, Phaser.Easing.Linear.None)
    // .start();

    // tween = game.add.tween(sprite).to( { x: 600 }, 2000, Phaser.Easing.Linear.None)
    // .to({ y: 300 }, 1000, Phaser.Easing.Linear.None)
    // .to({ x: 100 }, 2000, Phaser.Easing.Linear.None)
    // .to({ y: 100 }, 1000, Phaser.Easing.Linear.None)
    // .loop()
    // .start();

    // game.time.slowMotion = 2.0;

    // tween = game.add.tween(sprite).to( { x: 600 }, 2000, Phaser.Easing.Linear.None)
    // .to({ y: 300 }, 1000, Phaser.Easing.Linear.None)
    // .to({ x: 100 }, 2000, Phaser.Easing.Linear.None)
    // .to({ y: 100 }, 1000, Phaser.Easing.Linear.None)
    // .loop()
    // .start();

    // tween = game.add.tween(sprite).to( { x: 600 }, 2000, Phaser.Easing.Linear.None, true, 0, 1, true);
    // tween = game.add.tween(sprite).to( { x: 600 }, 2000, Phaser.Easing.Linear.None, true, 0, 1, true);
    // tween = game.add.tween(sprite).to( { x: "+500" }, 2000, Phaser.Easing.Linear.None, true, 0, 1, true);

    // tween = game.add.tween(sprite).to( { x: "+500" }, 8000, Phaser.Easing.Linear.None, true, 0, 1, true);

    // tween = game.add.tween(sprite).to( { x: 600 }, 4000, "Sine", true, 0, 1, true);

    // tween = game.add.tween(sprite).to( { x: 600 }, 4000, "Sine").start();

    // tween = game.add.tween(sprite).to( { x: 600 }, 2000, "Power0")
    // .to({ y: 300 }, 1000, "Power0")
    // .to({ x: 100 }, 2000, "Power0")
    // .to({ y: 100 }, 1000, "Power0")
    // .repeatAll(1)
    // .loop()
    // .start();

    // tween = game.add.tween(sprite).to( { x: 600 }, 2000, "Elastic").start();

    // tween = game.add.tween(sprite).to( { x: 600 }, 2000, "Power0")
    // .to({ y: 300 }, 1000, "Power0")
    // .to({ x: 100 }, 2000, "Power0")
    // .to({ y: 100 }, 1000, "Power0")
    // .repeatAll(3)
    // .start();

    // tween = game.add.tween(sprite).to( { x: 600 }, 4000, "Power0", false, 2000).start();


    // tween.onLoop.add(function() { console.log('loop'); }, this);
    // tween.onRepeat.add(function() { console.log('repeat'); }, this);
    // tween.onComplete.add(function() { console.log('complete'); }, this);
    // tween.onChildComplete.add(function() { console.log('child complete'); }, this);


    // var tween1 = game.add.tween(sprite).to( { x: 600 }, 4000, "Power0");
    // var tween2 = game.add.tween(sprite).to( { y: 400 }, 4000, "Power0");
    // var tween3 = game.add.tween(sprite).to( { x: 100 }, 4000, "Power0");
    // var tween4 = game.add.tween(sprite).to( { y: 100 }, 4000, "Power0");

    // tween1.chain(tween2, tween3, tween4);

    // tween1.start();

    tween = game.add.tween(sprite).to( { alpha: 0 }, 4000, "Power0").start();


    // game.input.onDown.add(setReverse, this);

    // console.log(tween.timeline[0]);


}

function setReverse() {

    // tween.speed++;
    tween.reverse = !tween.reverse;

}

function update() {

    // console.log(tween.timeline[0].dt, '=', tween.timeline[0].percent);

}

function render() {

    // game.debug.text(tween.)

}