<!doctype html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>pixi / chrome webgl test</title>
        <script src="../../../photonstorm-pixi.js/bin/pixi.dev.js"></script>
    </head>
    <body>

    <script>
        var stage = new PIXI.Stage(0x2d2d2d);

        var renderer = PIXI.autoDetectRenderer(512, 512);

        document.body.appendChild(renderer.view);

        var canvas = document.createElement("canvas");

        //  This causes it! Un-comment and it works as expected
        // canvas.width = 512;
        // canvas.height = 512;

        var context = canvas.getContext("2d");

        context.fillStyle = 'rgba(255, 255, 255, 1)';
        context.font = '28px Courier';
        context.fillText('x: starting', 0, 0);

        var texture = PIXI.Texture.fromCanvas(canvas);
        var test = new PIXI.Sprite(texture);

        stage.addChild(test);

        requestAnimFrame(animate);

        function animate(time) {

            requestAnimFrame(animate);

            context.clearRect(0, 0, 512, 512);

            //  Thinking maybe clearRect was faulty I tried this, but same result:
            // context.fillStyle = 'rgba(100, 0, 0, 1)';
            // context.fillRect(0, 0, 512, 512);

            context.fillStyle = 'rgba(255, 255, 255, 1)';
            context.fillText('t: ' + time.toString(), 16, 32);

            PIXI.updateWebGLTexture(test.texture.baseTexture, renderer.gl);

            renderer.render(stage);
        }
    </script>

    </body>
</html>