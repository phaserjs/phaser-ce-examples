var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create, update: update });

var sprites;

function create() {

    var digitsData = [
        '0000    1 2222 3333',
        '0  0    1    2    3',
        '0  0    1 2222 3333',
        '0  0    1 2       3',
        '0000    1 2222 3333',
        '                   ',
        '4  4 5555 6666 7777',
        '4  4 5    6       7',
        '4444 5555 6666    7',
        '   4    5 6  6    7',
        '   4 5555 6666    7',
        '                   ',
        '8888 9999          ',
        '8  8 9  9          ',
        '8888 9999          ',
        '8  8    9          ',
        '8888 9999          '];

    var pixelSize = 8;
    var x = 0;
    var y = 0;

    //  Create our Graphics object and draw the digits to it
    //  (one rectangle per character)

    var g = game.add.graphics(0, 0);
    
    g.beginFill(0x00ff00);

    digitsData.forEach(function(line) {

        for (var i = 0; i < line.length; i++)
        {
            if (line[i] !== ' ')
            {
                g.drawRect(x, y, pixelSize, pixelSize);
            }

            x += pixelSize;
        }

        x = 0;
        y += pixelSize;

    });

    g.endFill();

    //  Generate a Texture from the Graphics object

    var texture = g.generateTexture();

    //  This is our Graphics object sprite sheet, alpha'd out a 
    //  little so you can see the sprites over the top of it
    g.alpha = 0.5;

    //  And create a Sprite Sheet in the cache from the Texture

    //  The size of one frame of the sprite sheet
    var frameWidth = pixelSize * 4;
    var frameHeight = pixelSize * 5;

    //  The total number of sprites in the sheet
    var frameMax = 10;

    //  The spacing between each sprite in the sheet
    var margin = 0;
    var spacing = pixelSize;

    //  Add to the Cache using the 'digits' keyword
    game.cache.addSpriteSheet('digits', null, texture.baseTexture.source, frameWidth, frameHeight, frameMax, margin, spacing);

    //  Now we can create some sprites using this sprite sheet, just like we would any other

    sprites = game.add.physicsGroup(Phaser.Physics.ARCADE);

    for (var i = 0; i < 30; i++)
    {
        var s = sprites.create(game.world.randomX, game.world.randomY, 'digits', game.rnd.between(0, 10));

        s.animations.add('spin', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

        s.play('spin', game.rnd.between(2, 6), true);

        s.body.velocity.set(game.rnd.between(-200, 200), game.rnd.between(-200, 200));
        s.body.collideWorldBounds = true;
        s.body.bounce.set(1);
    }

}

function update() {

    game.physics.arcade.collide(sprites);

}
