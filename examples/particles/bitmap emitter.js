
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', this);

var emitter;
var LazerDash = {

    starData: [],
    particleTextures: []

};
var _colors = [];

function preload() {

    game.load.image('star-particle', '/interphase1/coverdisk/games/lazerdash/assets/star-particle.png');

}

function create() {

    scanBitmap();
    makePixelTextures();

    /*

    //  Debug array data

    var p1 = LazerDash.particleTextures[0].addToWorld(400, 10);
    var p2 = LazerDash.particleTextures[1].addToWorld(400, 20);
    var p3 = LazerDash.particleTextures[2].addToWorld(400, 30);

    var bob = game.make.bitmapData(13 * 4, 12 * 4);
    // bob.rect(0, 0, 32, 31, 'rgb(255,0,255)');

    for (var p = 0; p < LazerDash.starData.length; p++)
    {
        var s = LazerDash.starData[p];
        bob.draw(LazerDash.particleTextures[s.c], s.x, s.y, 4, 4);

        game.add.image(s.x, s.y, LazerDash.particleTextures[s.c]);
    }

    bob.addToWorld(300, 0);

    */

    this.emitter = this.add.emitter(0, 0, LazerDash.starData.length * 4);
    this.emitter.makeParticles('__default', null, LazerDash.starData.length * 4);
    this.emitter.gravity = 0;
    // this.emitter.setXSpeed(-40, 40);
    // this.emitter.setYSpeed(-40, 40);
    this.emitter.setXSpeed(0, 0);
    this.emitter.setYSpeed(0, 0);
    this.emitter.minRotation = 0;
    this.emitter.maxRotation = 0;
    this.emitter.particleAnchor.set(0);
    this.emitter.lifespan = 10000;

    var x = 200;
    var y = 200;

    for (var p = 0; p < LazerDash.starData.length; p++)
    {
        var s = LazerDash.starData[p];
        this.emitter.emitParticle(x + s.x, y + s.y, LazerDash.particleTextures[s.c]);
    }


}

function scanBitmap () {

    //  The star-particle sprite is 13x12 in size
    var bmd = game.make.bitmapData(13, 12);
    //  Paste it onto the bmd and update the pixels
    bmd.copy('star-particle').update();
    //  Scan that bad boy
    bmd.processPixelRGB(makePixel, this);

}

function makePixel (color, x, y) {

    //  We'll be sent 156 pixels in total (13x12)

    //  But we only care about this we can see (alpha > 0) - 102 in total
    if (color.a > 0)
    {
        //  Is this a new color we've not encountered before?

        var idx = _colors.indexOf(color.rgba);

        if (idx === -1)
        {
            idx = _colors.push(color.rgba) - 1;
        }

        //  Store the coordinates and color
        LazerDash.starData.push( { x: x * 2, y: y * 2, c: idx, r: color.rgba });
        // LazerDash.starData.push( { x: x * 4, y: y * 4, c: idx, r: color.rgba });
    }

    return false;

}

function makePixelTextures () {

    for (var i = 0; i < _colors.length; i++)
    {
        // var bmd = this.make.bitmapData(2, 2);
        var bmd = game.make.bitmapData(4, 4);
        // bmd.rect(0, 0, 2, 2, this._colors[i]);
        bmd.rect(0, 0, 4, 4, _colors[i]);
        bmd.update();
        LazerDash.particleTextures.push(bmd);
    }

}
