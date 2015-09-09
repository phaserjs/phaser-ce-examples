
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('hut', 'assets/tests/hut.png');

}

var cursors;

function create() {

    game.stage.backgroundColor = '#000042';

    huts = game.add.group();

    var s = 2 / 70;

    for (var i = 0; i < 70; i++)
    {
        // var obj = huts.create(game.world.centerX + game.rnd.between(-50,50), game.world.centerY - (i*2), 'hut');
        var obj = huts.create(game.world.centerX + game.rnd.between(-20,20), game.world.centerY - (i*2), 'hut');
        // var obj = huts.create(game.world.centerX, game.world.centerY - i, 'hut');
        obj.name = i;
        obj.scale.set(i * s);
        obj.anchor.set(0.5);
    }

    cursors = game.input.keyboard.createCursorKeys();

}

function rotate(spr, d) {

    spr.angle += d;
    // spr.x += Math.sin(spr.i);

}

function update() {

    if (cursors.left.isDown)
    {
        huts.forEach(rotate, this, false, -1);
    }
    else if (cursors.right.isDown)
    {
        huts.forEach(rotate, this, false, 1);
    }

}
