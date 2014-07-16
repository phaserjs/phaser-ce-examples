// A simple Phaser template

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload(){
  game.load.image('guy','http://examples.phaser.io/assets/sprites/phaser-dude.png')
}

var guySprite;
var guyImage;

function create(){

    var guys = game.add.group();
  guySprite = game.add.sprite(0,0,'guy');
  guyImage = game.add.image(0,30,'guy');
  
  guys.x = 150;
  guys.y = 150;

  guys.add(guySprite);
  guys.add(guyImage);
  
  game.input.onDown.add(logIt, this);
}

function logIt() {
  // console.log('sprite world',guySprite.world);
  // console.log('image world',guyImage.world);
  console.log(guySprite.worldTransform);
  console.log(guyImage.worldTransform[2]);

}