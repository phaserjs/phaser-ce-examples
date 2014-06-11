
var game = new Phaser.Game(898, 400, Phaser.CANVAS, 'afm', { preload: preload, create: create, update: update });

function preload() {

    Phaser.Canvas.setSmoothingEnabled(game.context, false);
    Phaser.Canvas.setImageRenderingCrisp(game.canvas);

    game.load.image('defaultFont', '../../assets/fonts/arcadeFonts/8x8/Ninja Gaiden (Tecmo).png');

}

var font = null;
var image = null;
var t = 'start typing';
var size = 8;
var styles = 1;
var currentStyle = 0;
var currentSpacingX = 0;
var currentSpacingY = 0;
var zoomTween = null;
var lastTint = 0;

function loadFont(f) {

    game.load.image('font', '../../assets/fonts/arcadeFonts/8x8/' + f + '.png', true);
    game.load.start();

}

function fileComplete(progress, cacheKey) {
    setupFont(cacheKey);
}

function setupFont(key) {

    if (game.cache.getImage(key).width === 1520)
    {
        size = 16;
    }
    else
    {
        size = 8;
    }
    
    styles = game.cache.getImage(key).height / size;

    currentStyle = 0;

    $('#currentStyle').text('< ' + (currentStyle + 1));
    $('#totalStyles').text(styles + '  >');

    if (image)
    {
        image.destroy();
        font.destroy();
    }

    font = game.add.retroFont(key, size, size, Phaser.RetroFont.TEXT_SET1);
    font.align = Phaser.RetroFont.ALIGN_CENTER;
    font.multiLine = true;
    font.autoUpperCase = false;
    font.customSpacingX = currentSpacingX;
    font.customSpacingY = currentSpacingY;
    font.buildRetroFontText();

    image = game.add.image(game.world.centerX, game.world.centerY, font);
    image.scale.set(4);
    image.anchor.set(0.5);
    image.smoothed = false;

}

function create() {

    game.load.onFileComplete.add(fileComplete, this);

    setupFont('defaultFont');

    game.stage.backgroundColor = '#272323';

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
    leftKey.onDown.add(prevFont, this);

    var rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    rightKey.onDown.add(nextFont, this);

    game.input.keyboard.addCallbacks(this, null, null, keyPress);

}

function removeTint() {

    image.tint = 16777215;

}

function updateTint(color) {

    var rgb = color.toRgb();
    var c = Phaser.Color.getColor(rgb.r, rgb.g, rgb.b);

    if (lastTint !== c)
    {
        image.tint = c;
        lastTint = c;
    }

}

function zoomIn() {

    if (zoomTween && zoomTween.isRunning)
    {
        return;
    }

    zoomTween = game.add.tween(image.scale).to( { x: image.scale.x + 1, y: image.scale.y + 1 }, 250, Phaser.Easing.Linear.None, true);

}

function zoomOut() {

    if (zoomTween && zoomTween.isRunning)
    {
        return;
    }

    if (image.scale.x > 1)
    {
        zoomTween = game.add.tween(image.scale).to( { x: image.scale.x - 1, y: image.scale.y - 1 }, 250, Phaser.Easing.Linear.None, true);
    }

}

function addSpacing() {

    font.customSpacingX++;
    font.buildRetroFontText();
    currentSpacingX = font.customSpacingX;

}

function removeSpacing() {

    if (font.customSpacingX > 0)
    {
        font.customSpacingX--;
        font.buildRetroFontText();
        currentSpacingX = font.customSpacingX;
    }

}

function addLineHeight() {

    font.customSpacingY++;
    font.buildRetroFontText();
    currentSpacingY = font.customSpacingY;

}

function removeLineHeight() {

    if (font.customSpacingY > 0)
    {
        font.customSpacingY--;
        font.buildRetroFontText();
        currentSpacingY = font.customSpacingY;
    }

}

function nextStyle() {

    if (currentStyle < (styles - 1))
    {
        currentStyle++;
        font.updateOffset(0, size);
        $('#currentStyle').text('< ' + (currentStyle + 1));
    }

}

function prevStyle() {

    if (currentStyle > 0)
    {
        currentStyle--;
        font.updateOffset(0, -size);
        $('#currentStyle').text('< ' + (currentStyle + 1));
    }

}

function addSpace() {

    t = t.concat(" ");

}

function addNewLine() {

    t = t.concat("\n");

}

function keyPress(char) {

    if (t === 'start typing')
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

function savePicture() {

    var bmd = game.make.bitmapData(image.width, image.height);

    Phaser.Canvas.setSmoothingEnabled(bmd.context, false);
    Phaser.Canvas.setImageRenderingCrisp(bmd.canvas);

    bmd.draw(image, 0, 0, image.width, image.height);

    bmd.canvas.toBlob(function(blob) {
        saveAs(blob, "arcade-font-writer.png");
    });

    ga('send', 'event', 'font', 'save', 'text', font.text);

}

$(function() {

    $('#font').change(
        function() {
            loadFont($("#font option:selected").text());
            $('#fontTitle').text($("#font option:selected").text());
        }
    );

    nextFont = function () {

        if (!game.load.isLoading)
        {
            $('option:selected', 'select').removeAttr('selected').next('option').attr('selected', 'selected');
            loadFont($("#font option:selected").text());
            $('#fontTitle').text($("#font option:selected").text());
        }

    }

    prevFont = function () {

        if (!game.load.isLoading)
        {
            $('option:selected', 'select').removeAttr('selected').prev('option').attr('selected', 'selected');
            loadFont($("#font option:selected").text());
            $('#fontTitle').text($("#font option:selected").text());
        }

    }

    $('#zoomIn').click(zoomIn);
    $('#zoomOut').click(zoomOut);

    $('#addSpacing').click(addSpacing);
    $('#removeSpacing').click(removeSpacing);

    $('#addLineHeight').click(addLineHeight);
    $('#removeLineHeight').click(removeLineHeight);

    $("#currentStyle").click(function(event) {
        prevStyle();
        event.preventDefault();
        document.onselectstart = function() { return false; };
        event.target.ondragstart = function() { return false; };
        return false;
    });

    $("#totalStyles").click(function(event) {
        nextStyle();
        event.preventDefault();
        document.onselectstart = function() { return false; };
        event.target.ondragstart = function() { return false; };
        return false;
    });

    $('#savePNG').click(savePicture);

    $("#controls").click(function(event) {
        $("#picker").spectrum("hide");
        $("#tint").spectrum("hide");
        event.preventDefault();
        document.onselectstart = function() { return false; };
        event.target.ondragstart = function() { return false; };
        return false;
    });

    $("#picker").spectrum({
        color: "#272323",
        showAlpha: false,
        localStorageKey: "afm.background",
        showPalette: true,
        showSelectionPalette: true,
        clickoutFiresChange: true,
        showButtons: true,
        preferredFormat: "hex",
        palette: [
            ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)",
            "rgb(204, 204, 204)", "rgb(217, 217, 217)","rgb(255, 255, 255)"],
            ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
            "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"], 
            ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)", 
            "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)", 
            "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)", 
            "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)", 
            "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)", 
            "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
            "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
            "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
            "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)", 
            "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
        ],
        move: function(color) {
            game.stage.backgroundColor = color.toHexString();
        },
        change: function(color) {
            game.stage.backgroundColor = color.toHexString();
        }
    });

});
