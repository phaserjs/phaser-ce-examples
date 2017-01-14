var game = new Phaser.Game(400, 400, Phaser.AUTO, 'phaser-example', { create: create, update: update });

var text, text2, text3, text4, cropRect;

function create() {

    cropRect = new Phaser.Rectangle(0, 0, 50, 50);

    console.log('a', PIXI.CanvasPool.getTotal());

    text = game.add.text(0, 0, "Aaaa", { font: "32px Arial", fill: "#ff0044" });
    text.crop(cropRect);

    console.log('b', PIXI.CanvasPool.getTotal());

    text2 = game.add.text(0, 50, "Destroy Me", { font: "32px Arial", fill: "#ff0044" });

    console.log('b2', PIXI.CanvasPool.getTotal());

    text2.destroy();

    console.log('c', PIXI.CanvasPool.getTotal());

    // text3 = game.add.text(0, 100, "Cccc", { font: "32px Arial", fill: "#ff0044" });
    // text3.crop(cropRect);

    text3 = game.add.bitmapData(100, 100);
    text3.fill(200,100,200);
    text3.addToWorld();


    console.log('d', PIXI.CanvasPool.getTotal());

    text4 = game.add.text(0, 150, "Ddddd", { font: "32px Arial", fill: "#ff0044" });
    text4.crop(cropRect);

    console.log('e', PIXI.CanvasPool.getTotal());

}


function update() {

    // text.updateCrop();
    // text3.updateCrop();
    // text4.updateCrop();

}