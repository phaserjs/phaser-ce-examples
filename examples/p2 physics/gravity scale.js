
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('ball', 'assets/sprites/shinyball.png');
    game.load.image('sky', 'assets/skies/sunset.png');

}

var sprite1;
var sprite2;
var sprite3;

function create() {

    game.add.image(0, 0, 'sky');

    //  Enable p2 physics
    game.physics.startSystem(Phaser.Physics.P2JS);

    game.physics.p2.gravity.y = 300;

    var spriteMaterial = game.physics.p2.createMaterial('spriteMaterial');
    var worldMaterial = game.physics.p2.createMaterial('worldMaterial');
    var contactMaterial = game.physics.p2.createContactMaterial(spriteMaterial, worldMaterial, { restitution: 1.0 });

    game.physics.p2.setWorldMaterial(worldMaterial);

    sprite1 = game.add.sprite(200, 100, 'ball');
    sprite2 = game.add.sprite(400, 100, 'ball');
    sprite3 = game.add.sprite(600, 100, 'ball');

    //  Enable for physics. This creates a default rectangular body.
    game.physics.p2.enable([ sprite1, sprite2, sprite3 ]);

    sprite1.body.setMaterial(spriteMaterial);
    sprite2.body.setMaterial(spriteMaterial);
    sprite3.body.setMaterial(spriteMaterial);

    //  Adjust the gravity scale
    //  At the moment you need to apply this to the body.data property, but this will change to just body as well in the future

    sprite1.body.data.gravityScale = 1;
    sprite2.body.data.gravityScale = 0.5;
    sprite3.body.data.gravityScale = 0.25;

}
