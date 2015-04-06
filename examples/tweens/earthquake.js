/**
 * @author    Jorge Palacios (@pctroll)
 *            http://jorge.palacios.co/
 */

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

  game.load.image('tile', 'assets/sprites/p2.jpeg');
  game.load.spritesheet('monster', 'assets/sprites/pixi_monsters.png', 154, 170);
    
}

function create() {
  
  // we need to add margin to the world, so the camera can move
  var margin = 50;
  // and set the world's bounds according to the given margin
  var x = -margin;
  var y = -margin;
  var w = game.world.width + margin * 2;
  var h = game.world.height + margin * 2;
  // it's not necessary to increase height, we do it to keep uniformity
  game.world.setBounds(x, y, w, h);
  
  // we make sure camera is at position (0,0)
  game.world.camera.position.set(0);
  
  // include some props on the scene
  game.add.tileSprite(x, y, w, h, 'tile');
  game.add.sprite(100, 100, 'monster', 0);
  game.add.sprite(500, 100, 'monster', 0);
  game.add.sprite(100, 400, 'monster', 0);
  game.add.sprite(500, 400, 'monster', 0);
  
  // this is where the magic happens
  addQuake();
  
}

function addQuake() {
  
  // define the camera offset for the quake
  var rumbleOffset = 10;
  
  // we need to move according to the camera's current position
  var properties = {
    x: game.camera.x - rumbleOffset
  };
  
  // we make it a relly fast movement
  var duration = 100;
  // because it will repeat
  var repeat = 4;
  // we use bounce in-out to soften it a little bit
  var ease = Phaser.Easing.Bounce.InOut;
  var autoStart = false;
  // a little delay because we will run it indefinitely
  var delay = 1000;
  // we want to go back to the original position
  var yoyo = true;
  
  var quake = game.add.tween(game.camera)
    .to(properties, duration, ease, autoStart, delay, 4, yoyo);
  
  // we're using this line for the example to run indefinitely
  quake.onComplete.addOnce(addQuake);
  
  // let the earthquake begins
  quake.start();
}
