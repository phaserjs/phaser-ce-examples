MissileCommand.Silo = function (game, x) {

	this.game = game;

	// this.rocketsBMD = bmd1;
	// this.explosionBMD = bmd2;

	this.launchX = x;
	this.launchY = 432;

	this.armory = 15;

	// this.rockets = [];
	// this.explosions = [];

    return this;

}

MissileCommand.Silo.prototype = {

	/*
	launch: function (x, y, speed) {

		if (this.armory > 0)
		{
			this.getRocket().launch(this, x, y, speed);
			this.armory--;
		}

	},

	getRocket: function () {

		for (var i = 0; i < this.rockets.length; i++)
		{
			if (this.rockets[i].alive === false)
			{
				return this.rockets[i];
			}
		}

		//	Got this far? We need a new rocket
		var rocket = new MissileCommand.Rocket(this.game, this.rocketsBMD);

		this.rockets.push(rocket);

		return rocket;

	},

	addExplosion: function (x, y) {

		var explosion = new MissileCommand.Explosion(this.game, this.explosionBMD);

		this.explosions.push(explosion);

		explosion.explode(x, y);

	},

	update: function () {

		for (var i = 0; i < this.rockets.length; i++)
		{
			if (this.rockets[i].alive)
			{
				this.rockets[i].update();
			}
		}

		for (var i = 0; i < this.explosions.length; i++)
		{
			if (this.explosions[i].alive)
			{
				this.explosions[i].update();
			}
		}

	}
	*/

}

MissileCommand.Silo.prototype.constructor = MissileCommand.Silo;
