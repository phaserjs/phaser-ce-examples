var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create });

function create() {

    console.time('create');

    var graphics = game.add.graphics(0, 0);

    for (var i = 0; i < 1000; i++)
    {
        graphics.beginFill(0x44447a);
        graphics.moveTo(i, i);
        graphics.lineTo(i + 1, i + 1);
        graphics.lineTo(i + 2, i + 4);
        graphics.lineTo(i + 3, i + 6);
        graphics.lineTo(i + 4, i + 7);
        graphics.lineTo(i, i);
        graphics.endFill();
    }

    console.timeEnd('create');

}
