
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

var filter;
var filter2;
var sprite;

function preload() {

    //  From http://glslsandbox.com/e#20450.0
    game.load.shader('blueDots', 'assets/shaders/blue-dots.frag');
    game.load.shader('bacteria', 'assets/shaders/bacteria.frag');

}

function create() {

    filter = new Phaser.Filter(game, null, game.cache.getShader('blueDots'));

    filter.setResolution(400, 600);

    sprite = game.add.sprite();
    sprite.width = 400;
    sprite.height = 600;

    sprite.filters = [ filter ];

    filter2 = new Phaser.Filter(game, null, game.cache.getShader('bacteria'));

    filter2.setResolution(400, 600);

    var sprite2 = game.add.sprite(400);
    sprite2.width = 400;
    sprite2.height = 600;

    sprite2.filters = [ filter2 ];



}

function update() {

    filter.update();
    filter2.update();

}
