
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.spritesheet('mummy', 'assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);
}

var text;

function create() {

    var mummy = game.add.sprite(300, 200, 'mummy');

    var walk = mummy.animations.add('walk');

    walk.enableUpdate = true;
    walk.onUpdate.add(onUpdate, this);

    mummy.animations.play('walk', 5, true);

    text = game.add.text(300, 264, "Frame 1", { font: "28px Arial", fill: "#ff0044" });

}

function onUpdate(anim, frame) {

    text.text = 'Frame ' + frame.index;

}