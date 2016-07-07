var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('space', 'assets/skies/space3.png');
    game.load.spritesheet('face', 'assets/sprites/metalface78x92.png', 78, 92);
}

var face1;
var face2;

function create() {

    game.add.sprite(0, 0, 'space');

    face1 = game.add.sprite(0, 0, 'face');
    face2 = game.add.sprite(500, 0, 'face');

    //  A simple animation that flashes the 'eyes' of the sprite
    face1.animations.add('flash', [0,1,2,3,2,1,0], 24, false);
    face2.animations.add('flash', [0,1,2,3,2,1,0], 24, false);

    //  Set-up the physics bodies
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.physics.arcade.enable([face1, face2]);
    
    face1.body.velocity.setTo(200, 200);
    face1.body.bounce.set(1);
    
    face2.body.velocity.setTo(-200, 200);
    face2.body.bounce.set(1);

    face1.body.collideWorldBounds = true;
    face2.body.collideWorldBounds = true;

    //   Usually you'd provide a callback to the `game.physics.arcade.collide` function,
    //   which is passed the two sprites involved in the collision, which you can then
    //   perform further processing on. However you can also use this signal:

    face1.body.onCollide = new Phaser.Signal();
    face1.body.onCollide.add(hitSprite, this);

    //  You still need to call `collide` in your update function, and you can still use
    //  a callback with it too, but this Signal provides for another level of notification.

}

function hitSprite (sprite1, sprite2) {

    sprite1.play('flash');
    sprite2.play('flash');
    
}

function update () {

    game.physics.arcade.collide(face1, face2);

}