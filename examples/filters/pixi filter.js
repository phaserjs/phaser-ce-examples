var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('phaser', 'assets/sprites/phaser2.png');

    //  Load your Pixi filters (the key you give them doesn't matter, but make sure it's unique)
    game.load.script('filter1', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/pixi/RGBSplitFilter.js');

}

function create() {

    for (var i = 0; i < 8; i++)
    {
        var logo = game.add.sprite(game.world.randomX, -150 + game.world.randomY, 'phaser');
        logo.anchor.set(0.5);
        logo.scale.set(game.rnd.realInRange(0.2, 1));
        game.add.tween(logo).to({ y: "+300" }, 1000 + game.rnd.between(1000,2000), "Bounce.easeOut", true, 0, -1, true);
    }

    //  Create the PIXI Filters:
    var rgb = new PIXI.RGBSplitFilter();

    //  And apply them. Here to the whole world, but you could apply them to whatever you need
    game.world.filters = [rgb];

}