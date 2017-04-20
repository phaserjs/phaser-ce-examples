
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('ufo', 'assets/sprites/ufo.png');

}

var total = 0;
var addUfo = false;

function create() {


}

function update() {

    if (addUfo)
    {
        for (var i = 0; i < 100; ++i)
        {
            game.add.sprite(game.world.randomX, game.world.randomY, 'ufo');
            total++;
        }
    }
}

window.onmousedown = function ()
{
    addUfo = true;
};

window.onmouseup = function ()
{
    addUfo = false;
    console.log(total);
};
