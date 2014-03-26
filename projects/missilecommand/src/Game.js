
MissileCommand.Game = function (game) {

    this.rocketsBitmap;
    this.rocketsLayer;

    this.explosionsBitmap;
    this.explosionsLayer;

    this.missilesBitmap;
    this.missilesLayer;

    this.missileLauncher;
    this.rocketLauncher;

    this.land;
    this.cities;

    // this.rocketSpeed = 10;
    // this.missileSpeed = 10000;
    // this.missileDelay = 10000;

    this.silo1;
    this.silo2;

};

MissileCommand.Game.prototype = {

	create: function () {

        this.stage.smoothed = false;

        this.add.image(0, 0, 'sky');

        this.rocketsBitmap = this.add.bitmapData(800, 600);
        this.missilesBitmap = this.add.bitmapData(800, 600);
        this.explosionsBitmap = this.add.bitmapData(800, 600);

        this.rocketsLayer = this.add.image(0, 0, this.rocketsBitmap);
        this.missilesLayer = this.add.image(0, 0, this.missilesBitmap);
        this.explosionsLayer = this.add.image(0, 0, this.explosionsBitmap);

        this.land = this.add.image(0, 432, 'land');

        this.cities = this.add.group();

        this.cities.add(new MissileCommand.City(this.game, 8));
        this.cities.add(new MissileCommand.City(this.game, 168));
        this.cities.add(new MissileCommand.City(this.game, 246));
        this.cities.add(new MissileCommand.City(this.game, 324));
        this.cities.add(new MissileCommand.City(this.game, 402));
        this.cities.add(new MissileCommand.City(this.game, 568));

        this.silo1 = new MissileCommand.Silo(this.game, 118);
        this.silo2 = new MissileCommand.Silo(this.game, 518);

        this.missileLauncher = new MissileCommand.MissileLauncher(this.game, this.missilesBitmap, this.cities);
        this.rocketLauncher = new MissileCommand.RocketLauncher(this.game, this.rocketsBitmap, this.explosionsBitmap, this.silo1, this.silo2);

        this.missileLauncher.startWave(12, 60, 4);

        this.input.onDown.add(this.rocketLauncher.launch, this.rocketLauncher);

	},

	update: function () {

        this.rocketsBitmap.clear();
        this.missilesBitmap.clear();
        this.explosionsBitmap.clear();

        this.rocketLauncher.update();
        this.missileLauncher.update();

        this.rocketLauncher.checkCollision(this.missileLauncher.getActiveMissiles());

	},

	quitGame: function () {

		this.state.start('MainMenu');

	}

};
