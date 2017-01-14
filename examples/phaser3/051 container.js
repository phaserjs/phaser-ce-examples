
var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('bg', 'assets/skies/sky1.png');
    game.load.image('particle', 'assets/sprites/aqua_ball.png');
    // game.load.image('logo', 'assets/pics/agent-t-buggin-acf_logo.png');
    game.load.image('logo', 'assets/sprites/phaser2.png');

}

function between (min, max)
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var container;
var image;
var logo;
var sprites = [];

function create() {

    container = game.add.container(game.stage, 400, 300, 'bob');
    container.pivotX = 400;
    container.pivotY = 300;

    image = game.add.image(0, 0, 'bg', 0, container, 'drumstick');

    //  Create the sprites
    for (var i = 0; i < 500; i++)
    {
        var x = between(-64, 800);
        var y = between(-64, 600);

        var image = game.add.image(x, y, 'particle', 0, container);

        // image.blendMode = Phaser.blendModes.ADD;
        // image.blendMode = Phaser.blendModes.MULTIPLY;

        sprites.push({ s: image, r: 2 + Math.random() * 6 });
    }

    logo = game.add.image(400, 300, 'logo', 0, container, 'logo');
    logo.anchor = 0.5;
    logo.scale = 0.5;

    game.add.tween(logo).to( { scaleX: 2, scaleY: 2 }, 3000, "Sine.easeInOut", true, 0, -1, true);

}

function update() {

    container.rotation += 0.01;

    for (var i = 0; i < sprites.length; i++)
    {
        var sprite = sprites[i].s;

        sprite.y -= sprites[i].r;

        if (sprite.y < -256)
        {
            sprite.y = 700;
        }
    }

}