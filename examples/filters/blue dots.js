
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

var filter;
var sprite;

function preload() {

    //  From http://glslsandbox.com/e#20450.0
    game.load.shader('blueDots', 'assets/shaders/blue-dots.frag');

}

function create() {

    filter = new Phaser.Filter(game, null, game.cache.getShader('blueDots'));

    filter.setResolution(800, 600);

    sprite = game.add.sprite();
    sprite.width = 800;
    sprite.height = 600;

    sprite.filters = [ filter ];

}

function update() {

    filter.update();

}
