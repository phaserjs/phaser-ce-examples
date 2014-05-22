Rox.Asteroids = function (state) {

    this.state = state;

    Phaser.Group.call(this, state.game);

    this.enableBody = true;

    this.sizesLarge = [ 'asteroid1', 'asteroid2', 'asteroid3' ];
    this.sizesMedium = [ 'asteroid4', 'asteroid5', 'asteroid6', 'asteroid7' ];
    this.sizesSmall = [ 'asteroid8', 'asteroid9', 'asteroid10', 'asteroid11' ];

    return this;

}

Rox.Asteroids.prototype = Object.create(Phaser.Group.prototype);
Rox.Asteroids.prototype.constructor = Rox.Asteroids;

Rox.Asteroids.prototype.update = function () {

    this.forEachExists(this.game.world.wrap, this.game.world, 32);

}

Rox.Asteroids.prototype.hit = function (roid, bullet) {

    //  split in reverse of bullet + variance?

    if (roid.size === 1)
    {
        this.spawn(roid.x, roid.y, 2, roid.body.speed * 1.5, roid.body.angularVelocity * 1.5);
        this.spawn(roid.x, roid.y, 2, roid.body.speed * 1.5, roid.body.angularVelocity * 1.5);
        roid.kill();
    }
    else if (roid.size === 2)
    {
        this.spawn(roid.x, roid.y, 3, roid.body.speed * 1.5, roid.body.angularVelocity * 1.5);
        this.spawn(roid.x, roid.y, 3, roid.body.speed * 1.5, roid.body.angularVelocity * 1.5);
        this.spawn(roid.x, roid.y, 3, roid.body.speed * 1.5, roid.body.angularVelocity * 1.5);
        roid.kill();
    }
    else
    {
        //  Drop bonus?
        roid.kill();
    }

}

Rox.Asteroids.prototype.spawn = function (x, y, size, speed, rotate) {

    if (size === 1)
    {
        var type = this.game.rnd.pick(this.sizesLarge);
    }
    else if (size === 2)
    {
        var type = this.game.rnd.pick(this.sizesMedium);
    }
    else if (size === 3)
    {
        var type = this.game.rnd.pick(this.sizesSmall);
    }

    var roid = new Rox.Asteroid(this.game, x, y, type, size);

    roid.scale.set(2);
    roid.anchor.set(0.5);

    this.add(roid);

    roid.body.velocity.x = this.game.rnd.integerInRange(-speed, speed);
    roid.body.velocity.y = this.game.rnd.integerInRange(-speed, speed);

    roid.body.angularVelocity = rotate;

}
