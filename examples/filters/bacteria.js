
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

var filter;

function preload() {

    //  From http://glslsandbox.com/e#20193.0
    game.load.shader('bacteria', 'assets/shaders/bacteria.frag');

}

function create() {

    filter = new Phaser.Filter(game, null, game.cache.getShader('bacteria'));

    filter.addToWorld(0, 0, 800, 600);

}

function update() {

    filter.update();

}
