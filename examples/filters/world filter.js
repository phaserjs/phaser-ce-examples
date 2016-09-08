var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('phaser', 'assets/sprites/phaser2.png');
    game.load.script('filter', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/pixi/DotScreenFilter.js');

}

function create() {

    //  Create a bunch of random sprites
    for (var i = 0; i < 8; i++)
    {
        var logo = game.add.sprite(game.world.randomX, -150 + game.world.randomY, 'phaser');
        logo.anchor.set(0.5);
        logo.scale.set(game.rnd.realInRange(0.2, 1));
        game.add.tween(logo).to({ y: "+300" }, 1000 + game.rnd.between(1000,2000), "Bounce.easeOut", true, 0, -1, true);
    }

    //  You can apply a filter to the entire world like this:
    game.world.filters = [new PIXI.DotScreenFilter()];

}