var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update:update });

function preload() {
    game.load.image('car', 'assets/sprites/car.png');
    game.load.image('tinycar', 'assets/sprites/tinycar.png');
}

function create() {
    game.physics.startSystem(Phaser.Physics.P2JS);
    bullets = game.add.group();
    for (var i = 0; i < 10; i++) {
        var bullet = bullets.create(game.rnd.integerInRange(200, 1700), game.rnd.integerInRange(-200, 400), 'tinycar');
        game.physics.p2.enable(bullet,false);
    }
    cursors = game.input.keyboard.createCursorKeys();
    ship = game.add.sprite(32, game.world.height - 150, 'car');
    game.physics.p2.enable(ship);
};

function update() {
    bullets.forEachAlive(moveBullets,this);  //make bullets accelerate to ship

    if (cursors.left.isDown) {ship.body.rotateLeft(100);}   //ship movement
    else if (cursors.right.isDown){ship.body.rotateRight(100);}
    else {ship.body.setZeroRotation();}
    if (cursors.up.isDown){ship.body.thrust(400);}
    else if (cursors.down.isDown){ship.body.reverse(400);}
};


function moveBullets (bullet) { 
     accelerateToObject(bullet,ship,30);  //start accelerateToObject on every bullet
}

function accelerateToObject(obj1, obj2, speed) {
    if (typeof speed === 'undefined') { speed = 60; }
    var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
    obj1.body.rotation = angle + game.math.degToRad(90);  // correct angle of angry bullets (depends on the sprite used)
    obj1.body.force.x = Math.cos(angle) * speed;    // accelerateToObject 
    obj1.body.force.y = Math.sin(angle) * speed;
}
