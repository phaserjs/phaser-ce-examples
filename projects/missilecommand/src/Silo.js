MissileCommand.Silo = function (game, x) {

	this.game = game;

	this.launchX = x;
	this.launchY = 432;

	this.armory = 15;

	this.counter = game.add.text(x - 6, 466, this.armory, { font: '10px Arial', fill: '#ffffff' });

    return this;

}

MissileCommand.Silo.prototype = {

	launch: function () {

		this.armory--;
		this.counter.text = this.armory;

	}

}

MissileCommand.Silo.prototype.constructor = MissileCommand.Silo;
