var Demo = {};

Demo.Backdrop = function ()
{
    this.bg;
    this.stars;
}

Demo.Backdrop.prototype.constructor = Demo.Backdrop;

Demo.Backdrop.prototype = {

    preload: function ()
    {
        this.load.image('bg', 'assets/phaser3/workbench.png');
    },

    create: function ()
    {
        this.bg = this.add.image(0, 0, 'bg');
    }

};

Demo.Particles = function ()
{
    this.particles = [];

    this.between = function (min, max)
    {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
}

Demo.Particles.prototype.constructor = Demo.Particles;

Demo.Particles.prototype = {

    preload: function ()
    {
        this.load.image('particle', 'assets/sprites/aqua_ball.png');
    },

    create: function ()
    {
        for (var i = 0; i < 500; i++)
        {
            var x = this.between(-64, 800);
            var y = this.between(-64, 600);

            var image = this.add.image(x, y, 'particle');

            // image.blendMode = Phaser.blendModes.ADD;
            // image.blendMode = Phaser.blendModes.MULTIPLY;

            this.particles.push({ s: image, r: 4 + Math.random() * 8 });
        }

        this.sys.fbo.program = this.sys.fbo._twirl;
    },

    update: function ()
    {
        for (var i = 0; i < this.particles.length; i++)
        {
            var particle = this.particles[i].s;

            particle.y -= this.particles[i].r;

            if (particle.y < -256)
            {
                particle.y = 700;
            }
        }
    }

};

Demo.SineWave = function ()
{
    this.slices;
    this.waveform;

    this.xl;
    this.cx = 0;
};

Demo.SineWave.prototype.constructor = Demo.SineWave;

Demo.SineWave.prototype = {

    preload: function ()
    {
        //  573 x 400
        this.load.image('sinewavePic', 'assets/phaser3/sinewave.png');

        //  373 x 378
        this.load.image('big3', 'assets/phaser3/big3.png');
    },

    create: function ()
    {
        this.add.image(0, 0, 'sinewavePic');

        //  Generate our motion data
        var motion = { x: 10 };
        var tween = this.add.tween(motion).to( { x: 190 }, 2000, "Bounce.easeInOut", true, 0, -1, true);
        this.waveform = tween.generateData(60);

        for (var i = 0; i < 200; i++)
        {
            this.waveform.push({ x: 10 });
        }

        this.xl = this.waveform.length - 1;

        this.slices = [];

        var picWidth = this.game.cache.getImage('big3').width;
        var picHeight = this.game.cache.getImage('big3').height;

        var ys = 4;

        for (var y = 0; y < Math.floor(picHeight / ys); y++)
        {
            var star = this.add.image(0, 30 + (y * ys), 'big3');

            //  Needs to clone the Frame, or they'll all use the same shared Frame crop

            star.frame = this.game.textures.cloneFrame('big3');

            //  This needs to move within the Texture Manager maybe?
            Phaser.TextureCrop(star, picWidth, ys, 0, y * ys);

            star.ox = star.x;

            star.cx = Phaser.Math.wrap(y * 2, 0, this.xl);

            this.slices.push(star);
        }

        this.sys.fbo.setPosition(500, 100);

    },

    update: function (frameDelta)
    {
        for (var i = 0; i < this.slices.length; i++)
        {
            this.slices[i].x = this.slices[i].ox + this.waveform[this.slices[i].cx].x;

            this.slices[i].cx++;

            if (this.slices[i].cx > this.xl)
            {
                this.slices[i].cx = 0;
            }
        }

    }

};


Demo.Stars = function ()
{
    this.p;

    this.width = 320;
    this.height = 220;
    this.depth = 1700;
    this.distance = 200;
    this.speed = 6;

    this.max = 500;
    this.xx = [];
    this.yy = [];
    this.zz = [];
};

Demo.Stars.prototype.constructor = Demo.Stars;

Demo.Stars.prototype = {

    preload: function ()
    {
        this.load.image('stars', 'assets/phaser3/stars.png');
    },

    create: function ()
    {
        this.stars = this.add.image(0, 0, 'stars');

        this.p = this.add.pixelField(0, 0, 2);

        for (var i = 0; i < this.max; i++)
        {
            this.xx[i] = Math.floor(Math.random() * this.width) - (this.width / 2);
            this.yy[i] = Math.floor(Math.random() * this.height) - (this.height / 2);
            this.zz[i] = Math.floor(Math.random() * this.depth) - 100;

            var perspective = this.distance / (this.distance - this.zz[i]);
            var x = (this.width / 2) + this.xx[i] * perspective;
            var y = (this.height / 2) + this.yy[i] * perspective;
            var a = (x < 0 || x > 320 || y < 20 || y > 260) ? 0 : 1;

            this.p.add(x, y, 255, 255, 255, a);
        }

        // this.sys.fbo.setSize(320, 240);
        this.sys.fbo.setPosition(64, 64);
    },

    update: function (frameDelta)
    {
        for (var i = 0; i < this.max; i++)
        {
            var perspective = this.distance / (this.distance - this.zz[i]);

            var x = (this.width / 2) + this.xx[i] * perspective;
            var y = (this.height / 2) + this.yy[i] * perspective;

            this.zz[i] += this.speed;

            if (this.zz[i] > this.distance)
            {
                this.zz[i] -= (this.distance * 2);
            }

            this.p.list[i].x = x;
            this.p.list[i].y = y;
            this.p.list[i].a = (x < 0 || x > 320 || y < 20 || y > 260) ? 0 : 1;
        }
    }
};

Demo.Logo = function ()
{
    this.logo;
}

Demo.Logo.prototype.constructor = Demo.Logo;

Demo.Logo.prototype = {

    preload: function ()
    {
        this.load.image('logo', 'assets/sprites/phaser2.png');
    },

    create: function ()
    {
        this.logo = this.add.image(400, 300, 'logo');
        this.logo.anchor = 0.5;
        this.logo.scale = 0.2;

        this.add.tween(this.logo).to( { scaleX: 1, scaleY: 1 }, 3000, "Sine.easeInOut", true, 0, -1, true);
    }

};

window.onload = function() {

    var game = new Phaser.Game(1280, 720, Phaser.WEBGL, 'phaser-example');

    game.state.add('Backdrop', Demo.Backdrop, true);
    // game.state.add('Particles', Demo.Particles, true);
    game.state.add('SineWave', Demo.SineWave, true);
    game.state.add('Stars', Demo.Stars, true);
    // game.state.add('Logo', Demo.Logo, true);

    window.game = game;

};
