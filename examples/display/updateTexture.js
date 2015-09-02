
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    console.log('--> preload');

    game.load.image('boss', 'assets/misc/boss1.png');

}

var texture;

function create() {

    console.log('--> create');

    // console.log(game.cache.getImage('boss'));

    // var base = new PIXI.BaseTexture(game.cache.getImage('boss'));

    var data = game.cache.getImage('boss', true);

    // data.base.hasLoaded = false;

    console.log(data);

    var bob = game.renderer.updateTexture(data.base);

    console.log('bob', bob);
    console.log(data);

    texture = new PIXI.Texture(data.base);

    game.add.sprite(0, 0, texture);

    // texture.baseTexture.hasLoaded = false;

    // //  Push the texture up to the GPU
    // var bob = game.renderer.updateTexture(texture.baseTexture);

    // console.log('result');
    // console.log(bob);
    // console.log(texture.baseTexture._dirty);
    // console.log(texture.baseTexture._glTextures);

    // game.input.onDown.add(dump, this);

}

function dump() {

    console.log('dump');
    console.log(texture.baseTexture._dirty);
    console.log(texture.baseTexture._glTextures);

}