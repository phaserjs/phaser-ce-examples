var cfg = {

    width: "100%",
    height: "100%",
    renderer: Phaser.CANVAS,
    state: { preload: preload, create: create, update: update, render: render },
    oldstate: { preload: preload, create: create }

}

var game = new Phaser.Game(cfg);

function preload() {

    game.load.image('coke', '/phaser-examples/examples/assets/sprites/cokecan.png');
    game.load.audio('tune', '/phaser-examples/examples/assets/audio/sd-ingame1.wav');

}

var music;

function create() {

    game.stage.backgroundColor = '#3d77ef';

    var pic = game.add.sprite(game.world.centerX, game.world.centerY, 'coke');
    pic.anchor.set(0.5);
    pic.scale.set(4);

    music = game.add.audio('tune');
    music.play();

}

function update() {

}

function render() {

}
