Rox.PlayerBullets = function (game, quantity) {

    Phaser.Group.call(this, game);

    //  Handy physics ref
    this.physics = game.physics.arcade;

    this.enableBody = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;

    //  The maximum number of bullets for the player
    this.createMultiple(quantity, 'bullet');
    // this.createMultiple(quantity, 'beam');

    this.setAll('anchor.x', 0.5);
    this.setAll('anchor.y', 0.5);

    //  bullet
    this.fireRate = 120;
    this.bulletTime = 0;
    this.bulletSpeed = 400;
    this.bulletLifeSpan = 1500;

    //  beam
    /*
    this.fireRate = 10;
    this.bulletTime = 0;
    this.bulletSpeed = 500;
    this.bulletLifeSpan = 1000;
    */

    return this;

}

Rox.PlayerBullets.prototype = Object.create(Phaser.Group.prototype);
Rox.PlayerBullets.prototype.constructor = Rox.PlayerBullets;

Rox.PlayerBullets.prototype.update = function () {

    this.forEachExists(this.game.world.wrap, this.game.world);

}

Rox.PlayerBullets.prototype.fire = function (player) {

    if (this.game.time.now >= this.bulletTime)
    {
        var bullet = this.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(player.body.x + 16, player.body.y + 16);

            bullet.lifespan = this.bulletLifeSpan;
            bullet.rotation = player.rotation;

            this.physics.velocityFromRotation(player.rotation, this.bulletSpeed, bullet.body.velocity);

            this.bulletTime = this.game.time.now + this.fireRate;

            return true;
        }
    }

    return false;

}
