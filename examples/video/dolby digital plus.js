
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.add.text(100, 100, "Loading videos ...", { font: "65px Arial", fill: "#ff0044" });

    game.load.video('dolby', 'assets/video/MP4_HPL40_30fps_channel_id_51.mp4');

}

var video;

function create() {

    video = game.add.video('dolby');

    video.play(true);

    //  x, y, anchor x, anchor y, scale x, scale y
    video.addToWorld(400, 300, 0.5, 0.5, 0.5, 0.5);

}
