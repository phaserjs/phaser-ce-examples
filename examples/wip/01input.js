var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {
    game.load.image('atari', 'assets/sprites/atari800xl.png');
}

var sprite;

function create() {

    game.stage.backgroundColor = '#2d2d2d';

    //  Group 1

    var g1 = game.add.group();

    g1.scale.set(2);

    //  Group 2

    var g2 = game.add.group();

    g2.x = 100;
    g2.y = 100;
    g2.scale.set(2);

    g1.add(g2);

    //  Create the sprite
    sprite = game.add.sprite(0, 0, 'atari');
    sprite.inputEnabled = true;

    sprite.scale.x = 0.5;
    // sprite.scale.y = -1;

    // Add sprite to the group
    g2.add(sprite);

    // Scale group to zero
    // g.scale.y = -1;
    // g.scale.setTo(0.5, -1);

    // Clicking in the game will trigger this onInputUp event.
    sprite.events.onInputUp.add(function(){
        console.log('clicked');
        console.log(sprite.worldTransform);
        console.log(sprite.worldScale);
        console.log(sprite.scale);
    },this);

}