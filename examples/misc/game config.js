
//  You can pass in a configuration object to the Game constructor 
//  instead of using the parameters, like this:

var conf = {
    width: 800,
    height: 600,
    renderer: Phaser.AUTO,
    parent: 'phaser-example',
    transparent: false,
    antialias: false,
    state: this,
    scaleMode: Phaser.ScaleManager.EXACT_FIT
};

var game = new Phaser.Game(conf);

function preload() {

    game.load.image('robota', 'assets/pics/Robota_UXO_by_Made_of_Bomb.jpg');

}

function create() {

    game.stage.backgroundColor = '#0076a3';

    var sprite = game.add.sprite(0, 50, 'robota');

    sprite.scale.set(0.5);

    game.add.tween(sprite).to( { x: -160 }, 2000, "Sine.easeInOut", true, false, -1, true);

}
