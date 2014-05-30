var cfg = {

    width: "100%",
    height: "100%",
    renderer: Phaser.WEBGL,
    state: { preload: preload, create: create, update: update, render: render },

}

var game = new Phaser.Game(cfg);

var batch;
var dudeBoundsPadding = 100;
var dudeBounds = new Phaser.Rectangle(-dudeBoundsPadding, -dudeBoundsPadding, window.innerWidth + dudeBoundsPadding * 2, window.innerHeight + dudeBoundsPadding * 2);
var tick = 0;

function preload() {

    game.load.image('maggot', '/phaser-examples/examples/assets/sprites/maggot.png');

}

function create() {

    batch = game.add.spriteBatch();

    var total = (game.renderType === Phaser.WEBGL) ? 1500 : 100;

    for (var i = 0; i < total; i++)
    {
        var dude = batch.create(game.world.randomX, game.world.randomY, 'maggot');

        dude.anchor.set(0.5);
        dude.scale.set(0.8 + Math.random() * 0.3);
        dude.direction = Math.random() * Math.PI * 2;
        dude.turningSpeed = Math.random() - 0.8;
        dude.speed = (2 + Math.random() * 2) * 0.2; 
        dude.offset = Math.random() * 100;
    }

}

function update() {

    batch.forEach(updateMaggot, this, false);

    tick += 0.1;

}

function render() {


}

function updateMaggot(dude) {

    dude.scale.y = 0.95 + Math.sin(tick + dude.offset) * 0.15
    dude.direction += dude.turningSpeed * 0.02;
    dude.position.x += Math.sin(dude.direction) * (dude.speed * dude.scale.y);
    dude.position.y += Math.cos(dude.direction) * (dude.speed * dude.scale.y);
    dude.rotation = -dude.direction + Math.PI;

    // wrap the dudes by testing their bounds..
    if (dude.position.x < dudeBounds.x)
        dude.position.x += dudeBounds.width;
    else if (dude.position.x > dudeBounds.x + dudeBounds.width)
        dude.position.x -= dudeBounds.width;

    if (dude.position.y < dudeBounds.y)
        dude.position.y += dudeBounds.height;
    else if (dude.position.y > dudeBounds.y + dudeBounds.height)
        dude.position.y -= dudeBounds.height;

}
