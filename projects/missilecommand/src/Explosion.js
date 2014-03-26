MissileCommand.Explosion = function (launcher) {

	this.launcher = launcher;
	this.game = launcher.game;
	this.bmd = launcher.explosionBMD;

	this.circle = new Phaser.Circle();

	this.alive = false;
	this.maxRadius = 60;
	this.speed = 1200;

	this.data = null;
	this.index = 0;
	this.hsvindex = 0;

    return this;

}

MissileCommand.Explosion.prototype = {

	explode: function (x, y) {

		this.circle.setTo(x, y, 1);

	    var tween = this.game.make.tween(this.circle).to( { radius: this.maxRadius }, this.speed, Phaser.Easing.Linear.None);
		tween.yoyo(true);

	    this.alive = true;
    
    	this.data = tween.generateData(60);
		this.index = 0;
		this.hsvindex = 0;

	},

	update: function () {

		if (this.alive)
		{
			this.bmd.context.fillStyle = this.launcher.hsv[this.hsvindex];

            this.bmd.context.beginPath();
            this.bmd.context.arc(this.circle.x, this.circle.y, this.circle.radius, 0, Math.PI * 2, false);
            this.bmd.context.closePath();
			this.bmd.context.fill();

            this.hsvindex++;

            if (this.hsvindex === 360)
            {
            	this.hsvindex = 0;
            }

			this.index++;

			if (this.index === this.data.length)
			{
				this.alive = false;
			}
			else
			{
				this.circle.radius = this.data[this.index].radius;
			}
		}

	},

	checkCollision: function (missiles) {

		for (var i = 0; i < missiles.length; i++)
		{
			if (this.circle.contains(missiles[i].x, missiles[i].y) && missiles[i].alive)
			{
				this.launcher.addExplosion(missiles[i].x, missiles[i].y);
				missiles[i].explode();
			}
		}

	}

};

MissileCommand.Explosion.prototype.constructor = MissileCommand.Explosion;
