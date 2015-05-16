
var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('pic', 'assets/pics/TheBrightestLightComesFromTheDarkestPlace_by_Slayer_Ghostown.png');
    
}

var text;

function create() {

    var pic = game.add.image(game.world.centerX, game.world.centerY, 'pic');
    pic.anchor.set(0.5);
    pic.alpha = 0.1;

    text = game.add.text(game.world.centerX, 100, "2000ms delay", { font: "32px Arial", fill: "#ff0044", align: "center" });
    text.anchor.set(0.5);

    //  This tween will wait 2 seconds before starting
    var tween = game.add.tween(pic).to( { alpha: 1 }, 2000, "Linear", true, 2000);

    tween.onStart.add(started, this);
    tween.onComplete.add(completed, this);

}

function started() {

    text.text = "tween started";

}

function completed() {

    text.text = "tween complete";

}
