MissileCommand.RocketLauncher = function (game, bmd1, bmd2, silo1, silo2) {

	this.game = game;

	this.rocketsBMD = bmd1;
	this.explosionBMD = bmd2;

	this.rocketSpeed = 4;

	this.silo1 = silo1;
	this.silo2 = silo2;

	this.rockets = [];
	this.explosions = [];
	this.hsv = this.getHSVColorWheel();

    return this;

}

MissileCommand.RocketLauncher.prototype = {

    launch: function (pointer) {

    	var rocket = this.getRocket();

        if (pointer.x < 320 && this.silo1.armory > 0)
        {
			rocket.launch(this.silo1, pointer.x, pointer.y, this.rocketSpeed);
			this.silo1.launch();
        }
        else if (this.silo2.armory > 0)
        {
			rocket.launch(this.silo2, pointer.x, pointer.y, this.rocketSpeed);
			this.silo2.launch();
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
		var rocket = new MissileCommand.Rocket(this);

		this.rockets.push(rocket);

		return rocket;

	},

	addExplosion: function (x, y) {

		this.getExplosion().explode(x, y);

	},

	getExplosion: function () {

		for (var i = 0; i < this.explosions.length; i++)
		{
			if (this.explosions[i].alive === false)
			{
				return this.explosions[i];
			}
		}

		var explosion = new MissileCommand.Explosion(this);

		this.explosions.push(explosion);

		return explosion;

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

	},

	checkCollision: function (missiles) {

		if (missiles.length === 0)
		{
			return;
		}

		for (var i = 0; i < this.explosions.length; i++)
		{
			if (this.explosions[i].alive)
			{
				this.explosions[i].checkCollision(missiles);
			}
		}

	},

    getHSVColorWheel: function (alpha) {

    	alpha = alpha || 255;

        var colors = [];

        for (var c = 0; c <= 359; c++)
        {
            colors[c] = Phaser.Color.getWebRGB(this.HSVtoRGB(c, 1.0, 1.0, alpha));
        }

        return colors;

    },

	/**
    * Convert a HSV (hue, saturation, lightness) color space value to an RGB color
    *
    * @method HSVtoRGB
    * @param {Number} h Hue degree, between 0 and 359
    * @param {Number} s Saturation, between 0.0 (grey) and 1.0
    * @param {Number} v Value, between 0.0 (black) and 1.0
    * @param {Number} alpha Alpha value to set per color (between 0 and 255)
    * @return {Number} 32-bit ARGB color value (0xAARRGGBB)
    */
    HSVtoRGB: function (h, s, v, alpha) {

        if (typeof alpha === "undefined") { alpha = 255; }
        
        var result;
        
        if (s == 0.0)
        {
            result = Phaser.Color.getColor32(alpha, v * 255, v * 255, v * 255);
        }
        else
        {
            h = h / 60.0;
            var f = h - Math.floor(h);
            var p = v * (1.0 - s);
            var q = v * (1.0 - s * f);
            var t = v * (1.0 - s * (1.0 - f));

            switch (Math.floor(h))
            {
                case 0:
                    result = Phaser.Color.getColor32(alpha, v * 255, t * 255, p * 255);
                    break;
                case 1:
                    result = Phaser.Color.getColor32(alpha, q * 255, v * 255, p * 255);
                    break;
                case 2:
                    result = Phaser.Color.getColor32(alpha, p * 255, v * 255, t * 255);
                    break;
                case 3:
                    result = Phaser.Color.getColor32(alpha, p * 255, q * 255, v * 255);
                    break;
                case 4:
                    result = Phaser.Color.getColor32(alpha, t * 255, p * 255, v * 255);
                    break;
                case 5:
                    result = Phaser.Color.getColor32(alpha, v * 255, p * 255, q * 255);
                    break;
            }
        }

        return result;

    }

}

MissileCommand.RocketLauncher.prototype.constructor = MissileCommand.RocketLauncher;
