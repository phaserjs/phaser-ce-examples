
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('ball', 'assets/demoscene/blue_ball.png');

}

var balls;

function create() {

	// game.stage.backgroundColor = 0xff8855;
    
    var ox = 200;
    var oy = 200;
    var spacing = 32;

    for (var y = 0; y < 16; y++)
    {
        for (var x = 0; x < 16; x++)
        {
            game.add.sprite(ox + (spacing * x), oy + (spacing * y), 'ball');
        }

    }

}

function update() {

}

function render() {

}