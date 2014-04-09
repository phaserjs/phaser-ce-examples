var imgs = [];

window.onload = function() {

    var canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 720;

    document.body.appendChild(canvas);

    var context = canvas.getContext('2d');

    var texture = PIXI.Texture.fromImage("wip/gt_7.png");

    for (var i = 0; i < 900; i++)
    {
        imgs.push( { x: Math.random() * 1280, y: Math.random() * 720 });
    }

    window.requestAnimationFrame(animate);

    function animate() {

        window.requestAnimationFrame(animate);

        for (var i = 0; i < 900; i++)
        {
            // context.drawImage(texture.baseTexture.source, 100, 100);
            context.drawImage(texture.baseTexture.source, imgs[i].x, imgs[i].y);
            // context.drawImage(texture.baseTexture.source, Math.random() * 1280, Math.random() * 720);
        }

    }

}
