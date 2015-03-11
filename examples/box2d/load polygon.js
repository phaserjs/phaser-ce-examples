/**
* @author       Chris Campbell <iforce2d@gmail.com>
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link http://choosealicense.com/licenses/no-license/|No License}
* 
* @description  This example requires the Phaser Box2D Plugin to run.
*               For more details please see http://phaser.io/shop/plugins/box2d
*/

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

function preload() {

    game.load.image('contra2', 'assets/pics/contra2.png');
    game.load.image('bunny', 'assets/sprites/bunny.png');
    game.load.image('tetrisblock1', 'assets/sprites/tetrisblock1.png');
    game.load.image('tetrisblock2', 'assets/sprites/tetrisblock2.png');
    game.load.image('tetrisblock3', 'assets/sprites/tetrisblock3.png');

    //  Load our physics data exported from PhysicsEditor
    game.load.physics('physicsData', 'assets/physics/sprites.json');

}

var contra;
var bunny;
var tetris1;
var tetris2;
var tetris3;

var start = false;

function create() {
    
    game.stage.backgroundColor = '#124184';

    // Enable Box2D physics
    game.physics.startSystem(Phaser.Physics.BOX2D);
    game.physics.box2d.setBoundsToWorld();

    contra = game.add.sprite(100, 200, 'contra2');
    bunny = game.add.sprite(500, 250, 'bunny');
    tetris1 = game.add.sprite(100, 400, 'tetrisblock1');
    tetris2 = game.add.sprite(300, 450, 'tetrisblock2');
    tetris3 = game.add.sprite(600, 450, 'tetrisblock3');

    // Enable the physics bodies on all the sprites
    game.physics.box2d.enable([ contra, bunny, tetris1, tetris2, tetris3 ]);

    // Clear the shapes
    contra.body.clearFixtures();
    bunny.body.clearFixtures();
    tetris1.body.clearFixtures();
    tetris2.body.clearFixtures();
    tetris3.body.clearFixtures();
    
    // Load polygons from the physicsData JSON file in the cache
    contra.body.loadPolygon('physicsData', 'contra2', contra);
    bunny.body.loadPolygon('physicsData', 'bunny', bunny);
    tetris1.body.loadPolygon('physicsData', 'tetrisblock1', tetris1);
    tetris2.body.loadPolygon('physicsData', 'tetrisblock2', tetris2);
    tetris3.body.loadPolygon('physicsData', 'tetrisblock3', tetris3);
    
    // Set up handlers for mouse events
    game.input.onDown.add(mouseDragStart, this);
    game.input.addMoveCallback(mouseDragMove, this);
    game.input.onUp.add(mouseDragEnd, this);
    
    game.add.text(5, 5, 'Shapes are exported from PhysicsEditor. Use mouse to drag bodies.', { fill: '#ffffff', font: '14pt Arial' });
}

function mouseDragStart() { 
    game.physics.box2d.mouseDragStart(game.input.mousePointer);    
}

function mouseDragMove() {  
    game.physics.box2d.mouseDragMove(game.input.mousePointer);    
}

function mouseDragEnd() {   
    game.physics.box2d.mouseDragEnd();    
}

function render() {
    
    game.debug.box2dWorld();
    
}
