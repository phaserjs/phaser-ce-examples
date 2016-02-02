
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create });

function create() {

    game.physics.startSystem(Phaser.Physics.P2JS);

    var bob = game.add.sprite(game.world.centerX, game.world.centerY);

    game.physics.p2.enable(bob, true);

    bob.body.clearShapes();

    var xOffset = 32;
    var yOffset = 32;

    var data = [ [0, 0], [0, 12.5], [96, 12.5], [96, 0], [0, 0] ];
    var data2 = [ [0, 0], [0, 12.5], [96, 12.5], [96, 0], [0, 0] ];

    for (var i = 0; i < data.length; i++)
    {
        data[i][0] += xOffset;
        data[i][1] += yOffset;
    }

    var p1 = bob.body.addPolygon({}, data);

    console.log(p1);

    for (var i = 0; i < data2.length; i++)
    {
        data2[i][0] += 100;
        data2[i][1] += 100;
    }

    var p2 = bob.body.addPolygon({}, data2);

    console.log(p2);

}
