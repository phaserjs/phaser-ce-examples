
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.atlas('seacreatures', 'assets/sprites/seacreatures_json.png', 'assets/sprites/seacreatures_json.json');

}

var bmd;
var jellyfish;

function create() {

    bmd = game.make.bitmapData(800, 600);

    game.add.image(0, 0, bmd);

    jellyfish = game.add.sprite(0, 0, 'seacreatures', 'blueJellyfish0010');
    jellyfish.animations.add('swim', Phaser.Animation.generateFrameNames('blueJellyfish', 0, 32, '', 4), 30, true);
    jellyfish.animations.play('swim');

}

function update() {

    if (game.input.activePointer.isDown)
    {
        //  This renders the jellyfish sprite to the BitmapData
        //  Note that it will render the currently displayed animation frame
        bmd.draw(jellyfish, game.input.activePointer.position.x, game.input.activePointer.position.y);
    }

}
