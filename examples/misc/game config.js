
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
    scaleMode: Phaser.ScaleManager.SHOW_ALL
};

var game = new Phaser.Game(conf);

function preload() {

    game.load.image('girl', 'assets/pics/manga-girl.png');

}

function create() {

    game.stage.backgroundColor = '#0076a3';

    var sprite = game.add.sprite(32, -100, 'girl');
    sprite.scale.set(4);

}
