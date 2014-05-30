
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });
// var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });


function preload() {

    game.load.image('font', 'assets/fonts/arcadefonts/waku-Waku Waku 7 (Sunsoft).png');

}

var font;
var image;
var t = 'type away';
var size = 8;
var styles = 1;
var currentStyle = 0;

function create() {

    game.stage.backgroundColor = '#2e3192';

    if (game.cache.getImage('font').width === 1520)
    {
        size = 16;
    }
    else
    {
        size = 8;
    }
    
    styles = game.cache.getImage('font').height / size;

    font = game.add.retroFont('font', size, size, Phaser.RetroFont.TEXT_SET1);
    font.align = Phaser.RetroFont.ALIGN_CENTER;
    font.multiLine = true;
    font.autoUpperCase = false;

    image = game.add.image(game.world.centerX, game.world.centerY, font);
    image.scale.set(4);
    image.anchor.set(0.5);
    image.smoothed = false;
    // image.tint = Math.random() * 0xFFFFFF;



    var backspace = game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
    backspace.onDown.add(deleteChar, this);

    var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    space.onDown.add(addSpace, this);

    var newline = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    newline.onDown.add(addNewLine, this);

    var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    upKey.onDown.add(nextStyle, this);

    var downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    downKey.onDown.add(prevStyle, this);

    var leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    leftKey.onDown.add(removeSpacing, this);

    var rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    rightKey.onDown.add(addSpacing, this);

    game.input.keyboard.addCallbacks(this, null, null, keyPress);


}

function addSpacing() {

    font.customSpacingX++;
    font.buildRetroFontText();

}

function removeSpacing() {

    if (font.customSpacingX > 0)
    {
        font.customSpacingX--;
        font.buildRetroFontText();
    }

}

function nextStyle() {

    if (currentStyle < (styles - 1))
    {
        currentStyle++;
        font.updateOffset(0, size);
    }

}

function prevStyle() {

    if (currentStyle > 0)
    {
        currentStyle--;
        font.updateOffset(0, -size);
    }

}

function addSpace() {

    t = t.concat(" ");

}

function addNewLine() {

    t = t.concat("\n");

}

function keyPress(char) {

    if (t === 'type away')
    {
        t = '';
    }

    t = t.concat(char);

}

function deleteChar() {

    if (t.length > 0)
    {
        t = t.substr(0, t.length - 1);
    }

}

function update() {

    font.text = t;

}

function render() {

    game.debug.text('Styles: ' + styles, 32, 32);
    game.debug.text('Current style: ' + currentStyle, 32, 64);
    // game.debug.text(t.length, 32, 64);

}
