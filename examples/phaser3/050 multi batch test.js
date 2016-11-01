
var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('bg', 'assets/skies/sky1.png');
    game.load.image('particle', 'assets/sprites/aqua_ball.png');
    // game.load.image('particle', 'assets/particles/yellow.png');
    game.load.image('logo', 'assets/sprites/phaser2.png');

}

function between (min, max)
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var sprites = [];
var p;
var data = { res: 4, pow: 10000, angle: 0.1, height: 6 };

function create() {

    game.renderer.enableMultiTextureSupport(['particle', 'logo']);

    game.add.image(0, 0, 'bg', 0, game.stage);

    p = game.add.pixelField(0, 0, 8, game.stage);

    for (var x = -100; x <= 100; x += 2)
    {
        var v = data.res * Math.floor(Math.sqrt((data.pow) - x * x) / data.res);

        for (var y = v; y > -v; y -= data.res)
        {
            var z = (32 * Math.sin(Math.sqrt(x * x + y * y) / data.height)) + data.angle * y;

            var drawX = 400 + Math.floor(x * 3);
            var drawY = 300 + Math.floor(z * 2);

            p.add(drawX, drawY, 255, 0, 255, 0.1);
        }
    }

    console.log(p.list.length);

    //  Create the sprites
    for (var i = 0; i < 500; i++)
    {
        var x = between(-64, 800);
        var y = between(-64, 600);

        var image = game.add.image(x, y, 'particle', 0, game.stage);

        // image.blendMode = Phaser.blendModes.ADD;
        // image.blendMode = Phaser.blendModes.MULTIPLY;

        sprites.push({ s: image, r: 2 + Math.random() * 6 });
    }

    var logo = game.add.image(400, 300, 'logo', 0, game.stage);
    logo.anchor = 0.5;
    logo.scale = 0.2;

    game.add.tween(logo).to( { scaleX: 1, scaleY: 1 }, 3000, "Sine.easeInOut", true, 0, -1, true);
    game.add.tween(data).to( { height: 12 }, 3000, "Sine.easeInOut", true, 4000, -1, true);
    game.add.tween(data).to( { angle: 1.0 }, 4000, "Linear", true, 0, -1, true);

}

function plot() {

    var i = 0;

    for (var x = -100; x <= 100; x += 2)
    {
        var v = data.res * Math.floor(Math.sqrt((data.pow) - x * x) / data.res);

        for (var y = v; y > -v; y -= data.res)
        {
            var z = (32 * Math.sin(Math.sqrt(x * x + y * y) / data.height)) + data.angle * y;

            p.list[i].x = 400 + Math.floor(x * 3);
            p.list[i].y = 300 + Math.floor(z * 2);

            i++;
        }
    }

}

function update() {

    for (var i = 0; i < sprites.length; i++)
    {
        var sprite = sprites[i].s;

        sprite.y -= sprites[i].r;

        if (sprite.y < -256)
        {
            sprite.y = 700;
        }
    }

    plot();

}