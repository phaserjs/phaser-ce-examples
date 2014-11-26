
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create});

function preload() {

    game.load.image('disk', 'assets/sprites/copy-that-floppy.png');

}

var sprite;

function create() {

    sprite = game.add.sprite(400, 100, 'disk');

    game.add.tween(sprite).to( { angle: 45 }, 2000, Phaser.Easing.Linear.None, true);
    game.add.tween(sprite.scale).to( { x: 2, y: 2 }, 2000, Phaser.Easing.Linear.None, true);
    
}
