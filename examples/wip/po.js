var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {
    game.load.image("diamond", "assets/sprites/diamond.png");
}

function create() {

    var diamond;

    for (var i = 0; i < 16; i++)
    {
        diamond = game.add.sprite(game.world.randomX, game.world.randomY, "diamond");
        diamond.anchor.set(0.5);
        diamond.inputEnabled = true;
        diamond.events.onInputDown.add(clickedDiamond, this);
    }

}

function clickedDiamond(diamond) {

    game.add.tween(diamond).to({ x: game.world.randomX, y: game.world.randomY }, 250, Phaser.Easing.Linear.None, true);

}
