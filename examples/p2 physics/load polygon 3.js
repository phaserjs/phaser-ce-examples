
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

	game.load.image('contra2', 'assets/pics/contra2.png');

}

var contra;

function create() {

	//	Enable p2 physics
	game.physics.startSystem(Phaser.Physics.P2JS);

	contra = game.add.sprite(game.world.centerX, game.world.centerY - 200, 'contra2');

	//	Enable the physics body on this sprite and turn on the visual debugger
	game.physics.p2.enable(contra, true);

	contra.body.clearShapes();

	//	You can specify the addition of a new polygon to a body in 3 different ways:

	contra.body.addPolygon( {} ,    10, 191  ,  26, 158  ,  25, 186  ,  13, 204  );
	// contra.body.addPolygon( {} , [   10, 191  ,  26, 158  ,  25, 186  ,  13, 204  ]);
	// contra.body.addPolygon( {} , [   [10, 191]  ,  [26, 158]  ,  [25, 186]  ,  [13, 204]  ]);

}
