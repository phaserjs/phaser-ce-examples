MissileCommand.MissileLauncher = function (game, bmd, cities) {

	this.game = game;
	this.bmd = bmd;
	this.cities = cities;

	this.missiles = [];

	this.speed = 15;

    this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.launch, this);

	return this;

}

MissileCommand.MissileLauncher.prototype = {

	launch: function () {

		this.getMissile().launch(this.cities.getRandom(), this.speed);

	},

	getMissile: function () {

		for (var i = 0; i < this.missiles.length; i++)
		{
			if (this.missiles[i].alive === false)
			{
				return this.missiles[i];
			}
		}

		//	Got this far? We need a new missile
		var missile = new MissileCommand.Missile(this);

		this.missiles.push(missile);

		return missile;

	},

	update: function () {

		for (var i = 0; i < this.missiles.length; i++)
		{
			if (this.missiles[i].alive)
			{
				this.missiles[i].update();
			}
		}

	},

	getActiveMissiles: function () {

		var output = [];

		for (var i = 0; i < this.missiles.length; i++)
		{
			if (this.missiles[i].alive)
			{
				output.push(this.missiles[i]);
			}
		}

		return output;

	}

}

MissileCommand.MissileLauncher.prototype.constructor = MissileCommand.MissileLauncher;
