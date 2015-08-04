
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.video('liquid', 'assets/video/liquid512x512.mp4');
    // game.load.video('liquid', 'assets/video/liquid2.mp4');

}

var video;
var group;

function create() {

    group = game.add.group();

    video = game.add.video('liquid');

    for (var i = 0; i < 10; i++)
    {
        var sprite = group.create(game.world.randomX, game.world.randomY, video);
        sprite.anchor.set(0.5);
        sprite.scale.set(game.rnd.realInRange(0.2, 0.5));
        game.add.tween(sprite).to( { angle: 360 }, game.rnd.between(4000, 8000), "Sine.easeInOut", true, 0, -1, true);
    }

    video.play(true);

}
