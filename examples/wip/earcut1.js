
var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example', { create: create });

function create () {

    var graphics = this.game.add.graphics(0, 0);

    // poly with 4 points
    var points = [new Phaser.Point(38,21), new Phaser.Point(83,10), new Phaser.Point(108,48), new Phaser.Point(100,100)]

    // a poly with more than 4 points breaks the rendering of the shape
    // comment out the line bewlow line and issue disappears
    points.push(new Phaser.Point(20,50))

    // fills break
    graphics.beginFill(0x00FF00)

    // outline seems to be ok 
    graphics.lineStyle(1,0xFF0000)

    graphics.drawPolygon(points)    
    graphics.endFill()

    graphics.cacheAsBitmap = true;

    // create our render texture to the size of the game        
    var renderTexture = new Phaser.RenderTexture(this.game, this.game.width, this.game.height)

    // we could use graphics width/height but it reports wrong
    //var renderTexture = new Phaser.RenderTexture(this.game, graphics.width, graphics.height)

    // render graphic to the texture    
    // neither of these methods work    
    renderTexture.renderXY(graphics, 0,0,true)
    // this.renderTexture.render(graphics, null, true);

    // add the texture to a sprite
    var myRenderedSprite = this.game.add.sprite(0,0,renderTexture)
    myRenderedSprite.x=400;

}
