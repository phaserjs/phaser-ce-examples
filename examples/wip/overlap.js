var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });
var atari1, atari2;

function preload() {
    game.load.image('atari', 'assets/sprites/atari800xl.png');
}

function create() {
    atari1 = game.add.sprite(300, 20, 'atari');
    atari2 = game.add.sprite(300, 300, 'atari');

    //  Input enable the second sprite and allow dragging
    atari2.inputEnabled = true;
    atari2.input.enableDrag(false);

    //  Enable physics
    game.physics.enable([atari1, atari2], Phaser.Physics.ARCADE);
    atari1.body.moves = false;
    atari2.body.moves = false;
}

function update() {

    // If the second sprite was dropped on top of the first sprite
    game.physics.arcade.overlap(atari1, atari2, droppedOverlap, function(){ return !atari2.input.isDragged; }, this);

}

function render() {
    game.debug.spriteBounds(atari1);
    game.debug.spriteBounds(atari2);
}

function droppedOverlap() {

    console.log('Sprite has been dropped on top of other sprite');

}