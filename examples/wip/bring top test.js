var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('block', 'assets/sprites/block.png');
}

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    for (var i = 0; i < 20; i++)
    {
        var block = game.add.sprite(game.world.randomX, game.world.randomY, 'block');
        block.name = 'block' + i;
        block.tint = Math.random() * 0xFFFFFF;
        block.inputEnabled = true;
        block.events.onInputDown.add(onInputDown, this);
    }

}

function onInputDown(item, pointer) {

    console.log(item.name);

    item.bringToTop();

}

function update() {
}
