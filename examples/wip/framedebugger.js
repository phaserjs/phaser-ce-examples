
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('pic', 'assets/pics/lance-overdose-loader_eye.png');
    game.load.spritesheet('sheet', 'assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);
    game.load.atlas('atlas', 'assets/sprites/seacreatures_json.png', 'assets/sprites/seacreatures_json.json');
    game.load.bitmapFont('desyrel', 'assets/fonts/bitmapFonts/desyrel.png', 'assets/fonts/bitmapFonts/desyrel.xml');
    game.load.image('star', 'assets/demoscene/star.png');
    game.load.image('starfield', 'assets/misc/starfield.jpg');

}

var distance = 300;
var speed = 4;
var stars;
var max = 10;
var xx = [];
var yy = [];
var zz = [];

function create() {

    game.add.tileSprite(0, 0, 800, 600, 'starfield');

    var graphics = game.add.graphics(100, 100);

    // set a fill and line style
    graphics.beginFill(0xFF3300);
    graphics.lineStyle(10, 0xffd900, 1);
    
    // draw a shape
    graphics.moveTo(50,50);
    graphics.lineTo(250, 50);
    graphics.lineTo(100, 100);
    graphics.lineTo(250, 220);
    graphics.lineTo(50, 220);
    graphics.lineTo(50, 50);
    graphics.endFill();
    
    // set a fill and line style again
    graphics.lineStyle(10, 0xFF0000, 0.8);
    graphics.beginFill(0xFF700B, 1);
    
    // draw a second shape
    graphics.moveTo(210,300);
    graphics.lineTo(450,320);
    graphics.lineTo(570,350);
    graphics.quadraticCurveTo(600, 0, 480,100);
    graphics.lineTo(330,120);
    graphics.lineTo(410,200);
    graphics.lineTo(210,300);
    graphics.endFill();
    
    // draw a rectangle
    graphics.lineStyle(2, 0x0000FF, 1);
    graphics.drawRect(50, 250, 100, 100);
    
    // draw a circle
    graphics.lineStyle(0);
    graphics.beginFill(0xFFFF0B, 0.5);
    graphics.drawCircle(470, 200, 200);
    graphics.endFill();

    graphics.lineStyle(20, 0x33FF00);
    graphics.moveTo(30,30);
    graphics.lineTo(600, 300);

    game.add.image(0, 0, 'pic');



    game.add.sprite(100, 100, 'sheet', 0);
    game.add.sprite(180, 100, 'sheet', 3);
    game.add.sprite(240, 100, 'sheet', 6);

    var style = { font: "32px Arial", fill: "#ff0044", align: "center" };
    var text = game.add.text(0, game.world.centerY, "Click to run FrameDebugger", style);

    var sprites = game.add.spriteBatch();

    stars = [];

    for (var i = 0; i < max; i++)
    {
        xx[i] = Math.floor(Math.random() * 800) - 400;
        yy[i] = Math.floor(Math.random() * 600) - 300;
        zz[i] = Math.floor(Math.random() * 1700) - 100;

        var star = game.make.sprite(0, 0, 'star');
        star.anchor.set(0.5);

        sprites.addChild(star);

        stars.push(star);
    }

    game.add.bitmapText(200, 100, 'desyrel', 'FrameDebugger', 64);

    game.add.sprite(300, 300, 'atlas', 0);

    game.input.onDown.add(record, this);

}

function record() {

    game.fd.record(4);

}

function update() {

    for (var i = 0; i < max; i++)
    {
        stars[i].perspective = distance / (distance - zz[i]);
        stars[i].x = game.world.centerX + xx[i] * stars[i].perspective;
        stars[i].y = game.world.centerY + yy[i] * stars[i].perspective;

        zz[i] += speed;

        if (zz[i] > 290)
        {
            zz[i] -= 600;
        }

        stars[i].alpha = Math.min(stars[i].perspective / 2, 1);
        stars[i].scale.set(stars[i].perspective / 2);
        stars[i].rotation += 0.1;

    }

}
