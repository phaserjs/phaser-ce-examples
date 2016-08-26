var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('phaser', 'assets/sprites/phaser2.png');
    game.load.script('gray', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/Gray.js');

}

function create() {

    for (var i = 0; i < 8; i++)
    {
        var logo = game.add.sprite(game.world.randomX, -150 + game.world.randomY, 'phaser');
        logo.anchor.set(0.5);
        logo.scale.set(game.rnd.realInRange(0.2, 1));
        game.add.tween(logo).to({ y: "+300" }, 1000 + game.rnd.between(1000,2000), "Bounce.easeOut", true, 0, -1, true);
    }

    // var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'phaser');
    // logo.anchor.setTo(0.5, 0.5);

    var gray = game.add.filter('Gray');

    game.world.filters = [gray];

}