
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var sprite,
    bmd,
    x,
    y,
    d,
    simplexNoise,
    perlinNoise,
    simplexImageData,
    perlinImageData,
    step = 4;



function preload() {

}

function create() {
  var alphaMax = 0;
  var alphaMin = 1;
  bmd = game.make.bitmapData(game.width, game.height);
  ctx = bmd.ctx;
  simplexImageData = ctx.createImageData(1,1);
  perlinImageData = ctx.createImageData(1, 1);
  sprite = game.add.sprite(0,0,bmd);
}

function update() {

  bmd.fill(0,0,0,1);

  for(x = 0; x < game.width; x+=step) {
    simplexNoise = (game.noise.simplex(x * 0.005, game.time.now * 0.00025) + 1.0) * 0.5;
    perlinNoise = (game.noise.perlin(x * 0.005, game.time.now * 0.00025) + 1.0) * 0.5;
    d = simplexImageData.data;
    d[0] = 0;
    d[1] = 255;
    d[2] = simplexNoise * 128 + 128;
    d[3] = 255;
    ctx.putImageData(simplexImageData, x, simplexNoise * game.height);

    d = perlinImageData.data;
    d[0] = 255;
    d[1] = 0;
    d[2] = perlinNoise * 128 + 128;;
    d[3] = 255;
    ctx.putImageData(perlinImageData, x, perlinNoise * game.height);
  }

}

function render() {
  d = simplexImageData.data;
  game.debug.text('Simplex Noise Line', 32, 32, 'rgb(' + d[0] + ',' + d[1] + ',' + d[2] + ')');
  d = perlinImageData.data;
  game.debug.text('Perlin Noise Line', 32, 64, 'rgb(' + d[0] + ',' + d[1] + ',' + d[2] + ')');
}
