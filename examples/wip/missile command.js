//  The in-bound missiles

MissileLauncher = function (game, bmd, cities) {

	this.game = game;
	this.bmd = bmd;
	this.cities = cities;

	this.missiles = [];

    this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.launch, this);

	return this;

}

MissileLauncher.prototype = {

	launch: function () {

		var m = new Missile(this.game, this.bmd);

		this.missiles.push(m);

		m.launch(this.cities.getRandom(), 10000);

	},

	update: function () {

		for (var i = 0; i < this.missiles.length; i++)
		{
			if (this.missiles[i].alive)
			{
				this.missiles[i].update();
			}
		}

	}

}

Missile = function (game, bmd) {

	this.game = game;
	this.bmd = bmd;

	this.x = 0;
	this.y = 0;
	this.alive = false;
	this.speed = 1;

	this.target = null;
	this.data = null;
	this.index = 0;

    return this;

}

Missile.prototype = {

	launch: function (target, speed) {

		this.x = game.world.randomX;
		this.y = 0;
		this.alive = true;
		this.speed = speed;

		this.target = target;

    	var destination = { x: this.x, y: this.y };

	    var tween = this.game.make.tween(destination).to( { x: target.hitX, y: target.hitY }, speed, Phaser.Easing.Linear.None);
    
    	this.data = tween.generateData(60);
		this.index = 0;

		this.x = this.data[this.index].x;
		this.y = this.data[this.index].y;

	},

	update: function () {

		if (this.alive)
		{
			this.bmd.context.fillStyle = '#ff0000';
			this.bmd.context.fillRect(this.x, this.y, 1, 1);

			this.index++;

			if (this.index === this.data.length)
			{
				this.alive = false;
				console.log('hit target?');
			}
			else
			{
				this.x = this.data[this.index].x;
				this.y = this.data[this.index].y;
			}

		}

	}

};

Missile.prototype.constructor = Missile;

//	The rockets you fire at the missiles

Rocket = function (game, bmd) {

	this.game = game;
	this.bmd = bmd;

	this.x = 0;
	this.y = 0;
	this.launchX = 0;
	this.launchY = 0;
	this.destX = 0;
	this.destY = 0;

	this.line = null;
	this.alive = false;
	this.speed = 1;

	this.silo = null;
	this.data = null;
	this.index = 0;

    return this;

}

Rocket.prototype = {

	launch: function (silo, destX, destY, speed) {

		this.silo = silo;
		this.launchX = silo.launchX;
		this.launchY = silo.launchY;

		this.destX = destX;
		this.destY = destY;

		this.line = new Phaser.Line(this.launchX, this.launchY, this.launchX, this.launchY);

		this.speed = Math.floor(this.game.math.distance(this.line.start.x, this.line.start.y, destX, destY) * speed);

    	var destination = { x: this.launchX, y: this.launchY };

	    var tween = this.game.make.tween(destination).to( { x: this.destX, y: this.destY }, this.speed, Phaser.Easing.Linear.None);

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
				this.silo.addExplosion(this.line.end.x, this.line.end.y);
			}
			else
			{
				this.line.end.x = this.data[this.index].x;
				this.line.end.y = this.data[this.index].y;
			}
		}

	}

};

Rocket.prototype.constructor = Rocket;


//	The resulting explosions

Explosion = function (game, bmd) {

	this.game = game;
	this.bmd = bmd;

	this.x = 0;
	this.y = 0;
	this.circle;

	this.alive = false;
	this.maxRadius = 40;
	this.speed = 750;

	this.data = null;
	this.index = 0;

    return this;

}

Explosion.prototype = {

	explode: function (x, y) {

		this.circle = new Phaser.Circle(x, y, 1);

	    var tween = this.game.make.tween(this.circle).to( { radius: this.maxRadius }, this.speed, Phaser.Easing.Linear.None);
		tween.yoyo(true);
	    tween.interpolation(game.math.catmullRomInterpolation);

	    this.alive = true;
    
    	this.data = tween.generateData(60);
		this.index = 0;

	},

	update: function () {

		if (this.alive)
		{
			this.bmd.context.fillStyle = '#ffff00';

            this.bmd.context.beginPath();
            this.bmd.context.arc(this.circle.x, this.circle.y, this.circle.radius, 0, Math.PI * 2, false);
            this.bmd.context.closePath();
			this.bmd.context.fill();

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

	}

};

Explosion.prototype.constructor = Explosion;




City = function (game, x) {

    Phaser.Sprite.call(this, game, x, 440, 'city', 0);

    this.hitX = this.x + 32;
    this.hitY = this.y + 30;

    return this;

}

City.prototype = Object.create(Phaser.Sprite.prototype);
City.prototype.constructor = City;


Silo = function (game, bmd1, bmd2, x) {

	this.game = game;

	this.rocketsBMD = bmd1;
	this.explosionBMD = bmd2;

	this.launchX = x;
	this.launchY = 432;

	this.armory = 15;

	this.rockets = [];
	this.explosions = [];

    return this;

}

Silo.prototype.constructor = Silo;

Silo.prototype = {

	launch: function (x, y, speed) {

		if (this.armory > 0)
		{
			var rocket = new Rocket(this.game, this.rocketsBMD);

			this.rockets.push(rocket);

			rocket.launch(this, x, y, speed);
		}

	},

	addExplosion: function (x, y) {

		var explosion = new Explosion(this.game, this.explosionBMD);

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

}


var game = new Phaser.Game(640, 480, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('title', 'assets/games/missilecommand/title-page.png');
    game.load.image('land', 'assets/games/missilecommand/land.png');
    game.load.image('marker', 'assets/games/missilecommand/marker.png');
    game.load.image('missile', 'assets/games/missilecommand/missile.png');
    game.load.image('sky', 'assets/skies/cavern2.png');
    game.load.spritesheet('city', 'assets/games/missilecommand/city.png', 64, 36);

}

var rocketsBitmap;
var rocketsLayer;

var explosionsBitmap;
var explosionsLayer;

var missilesBitmap;
var missilesLayer;

var missileLauncher;

var land;
var cities;

var rocketSpeed = 10;

var missileSpeed = 10000;
var missileDelay = 10000;

var m1;
var silo1;
var silo2;

function create() {

	game.stage.smoothed = false;

	game.add.image(0, 0, 'sky');

	rocketsBitmap = game.add.bitmapData(800, 600);
	missilesBitmap = game.add.bitmapData(800, 600);
	explosionsBitmap = game.add.bitmapData(800, 600);

	rocketsLayer = game.add.image(0, 0, rocketsBitmap);
	missilesLayer = game.add.image(0, 0, missilesBitmap);
	explosionsLayer = game.add.image(0, 0, explosionsBitmap);

	land = game.add.image(0, 432, 'land');

	cities = game.add.group();

	cities.add(new City(game, 8));
	cities.add(new City(game, 168));
	cities.add(new City(game, 246));
	cities.add(new City(game, 324));
	cities.add(new City(game, 402));
	cities.add(new City(game, 568));

	silo1 = new Silo(game, rocketsBitmap, explosionsBitmap, 118);
	silo2 = new Silo(game, rocketsBitmap, explosionsBitmap, 518);

	missileLauncher = new MissileLauncher(game, missilesBitmap, cities);

	game.input.onDown.add(launchRocket, this);

}

function launchRocket(pointer) {

	if (pointer.x < 320)
	{
		silo1.launch(pointer.x, pointer.y, rocketSpeed);
	}
	else
	{
		silo2.launch(pointer.x, pointer.y, rocketSpeed);
	}

}

function update() {

	rocketsBitmap.clear();
	explosionsBitmap.clear();

	missileLauncher.update();
	silo1.update();
	silo2.update();

}

function render() {

}
