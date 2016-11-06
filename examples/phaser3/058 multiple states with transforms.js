var demo = new Phaser.State('Demo');

demo.preload = function () {

    this.load.image('face', 'assets/pics/bw-face.png');

};

demo.create = function () {

    this.add.image(0, 0, 'face');

};

var test = new Phaser.State({ key: 'Test', active: true, x: 200, y: 200, width: 400, height: 300 });

test.preload = function () {

    this.load.image('barbarian', 'assets/pics/barbarian_loading.png');

};

test.create = function () {

    var i = this.add.image(0, 0, 'barbarian');

    window.bob = i;

    // i.scale = 2;

}

test.update = function () {

    this.sys.transform.rotation += 0.01;

};

var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example', [ demo, test ]);
