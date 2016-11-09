
var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example', { preload: preload, create: create });

function preload() {

    this.load.image('logo', 'assets/sprites/phaser2.png');

}

var logo;

function create() {

    logo = this.add.image(400, 300, 'logo');
    logo.anchor = 0.5;
    logo.scale = 0.2;

    // this.add.tween(logo).to( { scaleX: 1, scaleY: 1 }, 3000, "Sine.easeInOut", true, 0, -1, true);

}
