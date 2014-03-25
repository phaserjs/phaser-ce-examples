MissileCommand.City = function (game, x) {

    Phaser.Sprite.call(this, game, x, 440, 'city', 0);

    this.hitX = this.x + 32;
    this.hitY = this.y + 30;

    return this;

}

MissileCommand.City.prototype = Object.create(Phaser.Sprite.prototype);
MissileCommand.City.prototype.constructor = MissileCommand.City;

MissileCommand.City.prototype.nuked = function () {

	this.frame = 1;
	this.alive = false;

}