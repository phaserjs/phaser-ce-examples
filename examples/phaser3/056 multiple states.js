var demo = new Phaser.State('Demo');

demo.preload = function () {

    this.load.image('face', 'assets/pics/bw-face.png');

};

demo.create = function () {

    console.log(this.settings.key, 'is alive');

    this.add.image(0, 0, 'face');

    this.game.state.start('Test');

};

var test = new Phaser.State('Test');

test.preload = function () {

    this.load.image('barbarian', 'assets/pics/barbarian_loading.png');

};

test.create = function () {

    console.log(this.settings.key, 'is alive');

    var bob = this.add.image(0, 0, 'barbarian');

    bob.scale = 0.5;

}

var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example', [ demo, test ]);
