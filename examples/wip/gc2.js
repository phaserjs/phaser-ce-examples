window.onload = function () {

    // create an new instance of a pixi stage
    var stage = new PIXI.Stage(0x66FF99);

    // create a renderer instance
    var renderer = new PIXI.CanvasRenderer(1280, 720);

    // add the renderer view element to the DOM
    document.body.appendChild(renderer.view);

    requestAnimFrame(animate);

    // create a texture from an image path
    var texture = PIXI.Texture.fromImage("wip/gt_7.png");

    for (var i = 0; i < 900; i++)
    {
        var bunny = new PIXI.Sprite(texture);
        bunny.position.x = Math.random() * 1280;
        bunny.position.y = Math.random() * 720;
        stage.addChild(bunny);
    }

    function animate() {

        requestAnimFrame(animate);
        renderer.render(stage);

    }

}
