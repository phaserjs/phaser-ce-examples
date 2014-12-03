var game = new Phaser.Game(640, 480, Phaser.AUTO, 'phaser-example', {preload:preload, create:create, update:update});
var player;
var cursors;

function preload() {
  game.load.spritesheet('alysa', 'wip/alysa.png', 38, 52);
}

function create() {
  game.stage.backgroundColor = '#3498db';
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.gravity.y = 300;

  player = game.add.sprite(250, 170, 'alysa');
  player.jumping = false;
  player.facing = 'right';
  player.canDoubleJump = false;
  player.doubleJumping = false;

  player.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7], 14, true);
  player.animations.add('left',  [8, 9, 10, 11, 12, 13, 14, 15], 14, true);
  //player.animations.add('idle-right', [8], 10, false, false);
  //player.animations.add('idle-left', [9], 14, false, false);

  game.physics.arcade.enable(player);
  player.body.gravity.y = 1000;
  player.body.maxVelocity.y = 500;
  player.body.collideWorldBounds = true;

  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  player.body.velocity.x = 0;

  if (player.body.onFloor()) {
    player.jumping = false;
    player.doubleJumping = false;
    player.canDoubleJump = false;
  }

  if (cursors.left.isDown) {
    player.animations.play('left', 14, true);
    player.facing = 'left';
    player.body.velocity.x = -200;
  } else if (cursors.right.isDown) {
    player.animations.play('right');
    player.facing = 'right';
    player.body.velocity.x = 200;
  } else {
    player.animations.stop();
    if (player.facing == 'left') {
      //player.animations.play('idle-left');
    } else {
      //player.animations.play('idle-right');
    }
  }
  var anim1 = player.animations.getAnimation('left');
  var anim2 = player.animations.getAnimation('right');

  // console.log(anim1.frame, '-', anim2.frame);

  if (cursors.up.isDown && player.body.onFloor()) {
    player.jumping = true;
    player.body.velocity.y = -800;
  }

  // if (cursors.up.justReleased(50) && player.jumping && !player.doubleJumping) {
    // player.canDoubleJump = true;
  // }

  if (cursors.up.isDown && player.jumping && player.canDoubleJump) {
    player.doubleJumping = true;
    player.canDoubleJump = false;
    player.body.velocity.y = -500;
  }
}