
MissileCommand.Rocket = function (launcher) {

	this.launcher = launcher;
	this.game = launcher.game;
	this.bmd = launcher.rocketsBMD;

	this.destX = 0;
	this.destY = 0;

	this.line = new Phaser.Line();
	this.alive = false;
	this.speed = 1;

	this.silo = null;
	this.data = null;
	this.index = 0;

    return this;

}

MissileCommand.Rocket.prototype = {

	launch: function (silo, destX, destY, speed) {

		this.silo = silo;

		this.destX = destX;
		this.destY = destY;

		this.line.setTo(silo.launchX, silo.launchY, silo.launchX, silo.launchY);

		this.speed = Math.floor(this.game.math.distance(this.line.start.x, this.line.start.y, destX, destY) * speed);

	    var tween = this.game.make.tween(this.line.end).to( { x: this.destX, y: this.destY }, this.speed, Phaser.Easing.Linear.None);

    	this.data = tween.generateData(60);
		this.index = 0;

		this.alive = true;

	},

	update: function () {

		if (this.alive)
		{
			this.bmd.draw('marker', this.destX - 4, this.destY - 4);

			this.bmd.context.strokeStyle = '#0000ff';
            this.bmd.context.lineWidth = 1;
            this.bmd.context.beginPath();
            this.bmd.context.moveTo(this.line.start.x, this.line.start.y);
            this.bmd.context.lineTo(this.line.end.x, this.line.end.y);
            this.bmd.context.closePath();
            this.bmd.context.stroke();

            this.bmd.context.fillStyle = '#ffffff';
            this.bmd.context.fillRect(this.line.end.x, this.line.end.y, 1, 1);

			this.index++;

			if (this.index === this.data.length)
			{
				this.alive = false;
				this.launcher.addExplosion(this.line.end.x, this.line.end.y);
			}
			else
			{
				this.line.end.x = this.data[this.index].x;
				this.line.end.y = this.data[this.index].y;
			}
		}

	}

};

MissileCommand.Rocket.prototype.constructor = MissileCommand.Rocket;
