
//  Here is our custom Particle
MonsterParticle = function (game, x, y) {

    Phaser.Particle.call(this, game, x, y, game.cache.getBitmapData('particleShade'));

};

MonsterParticle.prototype = Object.create(Phaser.Particle.prototype);
MonsterParticle.prototype.constructor = MonsterParticle;

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create, render: render });

function create() {

    game.stage.backgroundColor = '#003663';

    //  Create our bitmapData which we'll use as our particle texture
    var bmd = game.add.bitmapData(64, 64);

    var radgrad = bmd.ctx.createRadialGradient(32, 32, 4, 32, 32, 32);

    radgrad.addColorStop(0, 'rgba(1, 159, 98, 1)');
    radgrad.addColorStop(1, 'rgba(1, 159, 98, 0)');

    bmd.context.fillStyle = radgrad;
    bmd.context.fillRect(0, 0, 64, 64);

    //  Put the bitmapData into the cache
    game.cache.addBitmapData('particleShade', bmd);

    //  Create our emitter

    emitter = game.add.emitter(game.world.centerX, 200, 200);

    emitter.width = 800;

    //  Here is the important line. This will tell the Emitter to emit our custom MonsterParticle class instead of a normal Particle object.
    emitter.particleClass = MonsterParticle;

    emitter.makeParticles();

    emitter.minParticleSpeed.set(0, 300);
    emitter.maxParticleSpeed.set(0, 400);

    emitter.setRotation(0, 0);
    emitter.setScale(0.1, 1, 0.1, 1, 12000, Phaser.Easing.Quintic.Out);
    emitter.gravity = -200;

    emitter.start(false, 5000, 100);

    game.input.onDown.add(updateBitmapDataTexture, this);

}

function updateBitmapDataTexture() {

    //  Get the bitmapData from the cache. This returns a reference to the original object
    var bmd = game.cache.getBitmapData('particleShade');

    bmd.context.clearRect(0, 0, 64, 64);

    //  createRadialGradient parameters: x, y, innerRadius, x, y, outerRadius
    var radgrad = bmd.ctx.createRadialGradient(32, 32, 4, 32, 32, 32);
    var c = Phaser.Color.getRGB(Phaser.Color.getRandomColor(0, 255, 255));

    radgrad.addColorStop(0, Phaser.Color.getWebRGB(c));
    c.a = 0;
    radgrad.addColorStop(1, Phaser.Color.getWebRGB(c));

    bmd.context.fillStyle = radgrad;
    bmd.context.fillRect(0, 0, 64, 64);

    //  All particles using this texture will update at the next render
    bmd.dirty = true;

}

function render() {

    game.debug.text('Click to regenerate the texture', 16, 28);

}
