var demo = new Phaser.State('Demo');

demo.preload = function () {

    this.load.image('face', 'assets/pics/bw-face.png');

}

demo.create = function () {

    this.add.image(0, 0, 'face');

}

var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example', demo);
