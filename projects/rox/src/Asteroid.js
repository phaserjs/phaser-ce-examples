Rox.Asteroid = function (game, x, y, type, size) {

    Phaser.Sprite.call(this, game, x, y, type);

    this.size = size;

    return this;

}

Rox.Asteroid.prototype = Object.create(Phaser.Sprite.prototype);
Rox.Asteroid.prototype.constructor = Rox.Asteroid;
