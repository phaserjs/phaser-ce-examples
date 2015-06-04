Rox.Player = function (game, x, y) {

    Phaser.Sprite.call(this, game, x, y, 'ship');

    this.anchor.set(0.5);

    //  Handy physics ref
    this.physics = game.physics.arcade;

    this.physics.enable(this);

    this.body.drag.set(100);
    this.body.maxVelocity.set(200);

    this.speed = 200;
    this.turnSpeed = 300;

    //  The flash of the guns as we fire them
    this.muzzle = new Phaser.Sprite(game, x, y, 'flash', 0);
    this.muzzle.anchor.set(0.5);

    this.muzzle.animations.add('fire1', [ 0, 1, 0 ], 30, false);
    this.muzzle.animations.add('fire2', [ 0, 2, 0 ], 30, false);
    this.muzzle.animations.add('fire3', [ 0, 3, 0 ], 30, false);
    this.muzzle.animations.add('fire4', [ 0, 4, 0 ], 30, false);

    //  Our bullets - this is a Phaser.Group that we manage from here
    this.bullets = new Rox.PlayerBullets(game, 50);

    //  The particle trail following the player
    this.trail = new Phaser.Particles.Arcade.Emitter(game, 0, 0, 200);
    this.trail.makeParticles('jets');
    this.trail.setRotation(0, 0);
    this.trail.gravity = 0;
    this.trail.setAlpha(1, 0, 3000);
    this.trail.setScale(1, 0, 1, 0, 1000);

    this.isThrusting = false;

    return this;

}

Rox.Player.prototype = Object.create(Phaser.Sprite.prototype);
Rox.Player.prototype.constructor = Rox.Player;

Rox.Player.prototype.update = function () {

    //  Happens AFTER the State update
    this.game.world.wrap(this, 16);

    this.muzzle.x = this.x;
    this.muzzle.y = this.y;
    this.muzzle.rotation = this.rotation;

    this.trail.emitX = this.x;
    this.trail.emitY = this.y;

    var px = this.body.velocity.x;
    var py = this.body.velocity.y;

    px *= -1;
    py *= -1;

    this.trail.minParticleSpeed.set(px, py);
    this.trail.maxParticleSpeed.set(px, py);

    // if (this.body.speed > 50 && !this.isThrusting)
    // {
        this.trail.start(true, 1000, 8, 1);
    // }

    this.trail.forEachExists(this.game.world.wrap, this.game.world);

}

Rox.Player.prototype.zero = function () {

    this.body.acceleration.set(0);
    this.body.angularVelocity = 0;
    this.isThrusting = false;

}

Rox.Player.prototype.thrust = function () {

    this.physics.accelerationFromRotation(this.rotation, this.speed, this.body.acceleration);
    
    // this.trail.start(true, 1000, 8, 1);

    this.isThrusting = true;

}

Rox.Player.prototype.rotateLeft = function () {

    this.body.angularVelocity = -this.turnSpeed;

}

Rox.Player.prototype.rotateRight = function () {

    this.body.angularVelocity = this.turnSpeed;

}

Rox.Player.prototype.fire = function () {

    if (this.bullets.fire(this))
    {
        //  fire1 = bullets
        //  fire2 = fire beam
        //  fire3 = blue bullets
        //  fire4 = blue beam
        // this.muzzle.play('fire1');
        this.muzzle.play('fire1');
    }

}
