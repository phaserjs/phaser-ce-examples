var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('tetrisblock1', 'assets/sprites/tetrisblock1.png');
    game.load.image('tetrisblock2', 'assets/sprites/tetrisblock2.png');
    game.load.image('tetrisblock3', 'assets/sprites/tetrisblock3.png');

    game.load.physics('physicsData', 'assets/physics/sprites.json');

}

var tetris1;
var tetris2;
var tetris3;
var mouseBody;
var mouseConstraint;

function create() {
        
    //  Enable p2 physics
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 1000;
    
    tetris1 = game.add.sprite(300, 100, 'tetrisblock1');
    tetris2 = game.add.sprite(375, 200, 'tetrisblock2');
    tetris3 = game.add.sprite(450, 300, 'tetrisblock3');
    
    //  Create collision group for the blocks
    var blockCollisionGroup = game.physics.p2.createCollisionGroup();
    
    //  This part is vital if you want the objects with their own collision groups to still collide with the world bounds
    //  (which we do) - what this does is adjust the bounds to use its own collision group.
    game.physics.p2.updateBoundsCollisionGroup();
    
    //  Enable the physics bodies on all the sprites
    game.physics.p2.enable([ tetris1, tetris2, tetris3 ], false);
    
    tetris1.body.clearShapes();
    tetris1.body.loadPolygon('physicsData', 'tetrisblock1');
    tetris1.body.setCollisionGroup(blockCollisionGroup);
    tetris1.body.collides([blockCollisionGroup]);
    
    tetris2.body.clearShapes();
    tetris2.body.loadPolygon('physicsData', 'tetrisblock2');
    tetris2.body.setCollisionGroup(blockCollisionGroup);
    tetris2.body.collides([blockCollisionGroup]);
    
    tetris3.body.clearShapes();
    tetris3.body.loadPolygon('physicsData', 'tetrisblock3');
    tetris3.body.setCollisionGroup(blockCollisionGroup);
    tetris3.body.collides([blockCollisionGroup]);   
    
    // create physics body for mouse which we will use for dragging clicked bodies
    mouseBody = new p2.Body();
    game.physics.p2.world.addBody(mouseBody);
        
    // attach pointer events
    game.input.onDown.add(click, this);
    game.input.onUp.add(release, this);
    game.input.addMoveCallback(move, this);
}

function click(pointer) {

    var bodies = game.physics.p2.hitTest(pointer.position, [ tetris1.body, tetris2.body, tetris3.body ]);
    
    // p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
    var physicsPos = [game.physics.p2.pxmi(pointer.position.x), game.physics.p2.pxmi(pointer.position.y)];
    
    if (bodies.length)
    {
        var clickedBody = bodies[0];
        
        var localPointInBody = [0, 0];
        // this function takes physicsPos and coverts it to the body's local coordinate system
        clickedBody.toLocalFrame(localPointInBody, physicsPos);
        
        // use a revoluteContraint to attach mouseBody to the clicked body
        mouseConstraint = this.game.physics.p2.createRevoluteConstraint(mouseBody, [0, 0], clickedBody, [game.physics.p2.mpxi(localPointInBody[0]), game.physics.p2.mpxi(localPointInBody[1]) ]);
    }   

}

function release() {

    // remove constraint from object's body
    game.physics.p2.removeConstraint(mouseConstraint);

}

function move(pointer) {

    // p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
    mouseBody.position[0] = game.physics.p2.pxmi(pointer.position.x);
    mouseBody.position[1] = game.physics.p2.pxmi(pointer.position.y);

}

function update() {
}

function render() {

//  game.debug.text(result, 32, 32);

}