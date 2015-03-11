
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create, update: update, render: render });

var groundVertices = [-200,-0,-130.128,5.08323,-89.0526,-0.105309,-31.5464,1.19183,1.31426,5.5156,
50.6053,4.21846,87.7897,-2.26719,148.755,-4.42908,200,-0,251.899,4.99306,
289.063,13.0285,335.267,18.0508,369.418,9.01079,383.48,14.033,410.6,3.9886,
433.702,2.98414,467.853,10.0152,487.942,20.0596,512.048,23.073,545.195,8.00633,
571.31,1.97973,591.399,-16.1001,623.541,-24.1356,647.647,-20.1179,678.785,-22.1268,
695.86,-35.1845,743.069,-44.2244,776.215,-40.2067,820.41,-25.14,870.632,-22.1268,
912.819,-37.1933,934.961,-44.1016,954.92,-38.8491,974.88,-45.152,996.94,-39.8996,
1037.91,-49.354,1059.97,-63.0105,1086.23,-84.0204,1115.65,-85.0708,1153.46,-72.4649,
1193.38,-77.7174,1227,-91.3739,1252.21,-110.283,1277.42,-108.182,1281.62,-127.091,
1306.84,-141.103,1331,-144.255,1355.16,-155.81,1401.38,-175.77,1441.66,-173.359,
1505.38,-153.709,1566.27,-143.124,1604.33,-141.244,1653.27,-154.234,1687.75,-141.272,
1715.01,-112.084,1743.6,-57.5053,1764.91,-35.513,1783.52,-43.7838,1804.2,-96.8544,
1805.57,-132.694,1812.47,-142.344,1873.12,-149.236,1931.01,-140.965,2023.37,-126.491,
2066.1,-143.722,2088.85,-166.467,2102.63,-189.901,2130.89,-204.374,2168.8,-207.82,
2234.96,-205.064,2261.58,-191.522,2286.18,-163.977,2316.62,-117.978,2340.88,-82.6962,
2383.71,-55.007,2437.38,-41.609,2483.31,-37.5896,2507.01,-40.8224,2535.75,-46.8021,
2553.06,-51.5425,2588.75,-80.737,2609.11,-94.0372,2626.65,-113.754,2646.7,-132.646,
2671.69,-154.192,2686.72,-164.424,2714.27,-175.401,2758.47,-179.97,2952.34,-178.248,
2952.34,-205.573,3064.31,-204.906,3099.63,-189.578,3177.37,-190.754,3184.57,-214.917,
3274.26,-203.48,3324.75,-185.774,3421.53,-169.584,3484.18,-159.587,3559.48,-158.92,
3613.47,-168.251,3646.79,-173.582,3681.45,-168.917,3695.73,-99.6964,3712.15,75.9802,
3777.14,211.665,3829.27,115.972,3882.12,285.935,3908.54,203.096,3963.53,283.793,
3989.95,55.2703,4049.94,183.814,4079.22,-4.00267,4092.79,-32.5679,4113.5,-41.1375,
4167.77,-36.1386,4262.75,-9.0016,4372.57,29.6882,4504.22,43.4773,4649.69,49.6867,
4674.48,29.5702,4713.99,14.847,4760.58,14.6627,4803.11,38.8688,4819.84,15.0291,
4858.19,-1.45256,4896.91,5.9419,4925.06,31.9846,4960.49,17.0905,5006.14,15.8518,
5050.86,24.3401,5078.48,41.8191,5498.61,41.7032,5499.5,-306.024];

var truckVertices = [-0.941074,-7.13798,-69.9798,-7.91197,-73.1929,8.39935,-68.3795,12.8165,-57.3861,13.1711,
-48.8751,3.47799,-35.3993,2.53232,-23.1057,14.7078,34.2254,15.6535,45.2188,3.8326,
59.8766,3.8326,67.2056,10.2159,71.7627,9.80711,72.9977,1.35024,69.3556,-5.51562,
34.5293,-7.36343,21.802,-21.4563,1.15879,-21.9506];

var truckBody;
var driveJoints = [];

function create() {
	
	game.world.setBounds(-10000, -10000, 20000, 20000);
	
	game.stage.backgroundColor = '#124184';

	// Enable Box2D physics
	game.physics.startSystem(Phaser.Physics.BOX2D);
	game.physics.box2d.gravity.y = 500;
	game.physics.box2d.friction = 0.8;
	
	// Make the ground body
	var groundBody = new Phaser.Physics.Box2D.Body(this.game, null, 0, 0, 0);
	groundBody.setChain(groundVertices);
	
	var PTM = 50;
	
	// Make the truck body
	truckBody = new Phaser.Physics.Box2D.Body(this.game, null, 0, -1*PTM);
	truckBody.setPolygon(truckVertices);
		
	// Make the wheel bodies
	var wheelBodies = [];
	wheelBodies[0] = new Phaser.Physics.Box2D.Body(this.game, null, -0.82*PTM, 0.6*-PTM);
	wheelBodies[1] = new Phaser.Physics.Box2D.Body(this.game, null,  1.05*PTM, 0.6*-PTM);
	wheelBodies[0].setCircle(0.3*PTM);
	wheelBodies[1].setCircle(0.3*PTM);
	
	var frequency = 3.5;
	var damping = 0.5;	
	var motorTorque = 2;
	var rideHeight = 0.5;
	
	// Make wheel joints
	// bodyA, bodyB, ax, ay, bx, by, axisX, axisY, frequency, damping, motorSpeed, motorTorque, motorEnabled	
	driveJoints[0] = game.physics.box2d.wheelJoint(truckBody, wheelBodies[0], -0.82*PTM,rideHeight*PTM, 0,0, 0,1, frequency, damping, 0, motorTorque, true ); // rear
	driveJoints[1] = game.physics.box2d.wheelJoint(truckBody, wheelBodies[1],  1.05*PTM,rideHeight*PTM, 0,0, 0,1, frequency, damping, 0, motorTorque, true ); // front

	cursors = game.input.keyboard.createCursorKeys();
	
	game.camera.follow(truckBody);
	
	var caption = game.add.text(5, 5, 'Simple car control. Left/right arrow keys to move, down arrow key to brake.', { fill: '#ffffff', font: '14pt Arial' });
	caption.fixedToCamera = true;
}

function update() {
	
	var motorSpeed = 50; // rad/s
	var motorEnabled = true;
	
	if (cursors.down.isDown) { motorSpeed = 0; } // prioritize braking
	else if (cursors.left.isDown && !cursors.right.isDown) { motorSpeed *= -1; }
    else if (cursors.right.isDown && !cursors.left.isDown) {  }
	else { motorEnabled = false; } // roll if no keys pressed
	
	for (var i = 0; i < 2; i++) {
		driveJoints[i].EnableMotor(motorEnabled);
		driveJoints[i].SetMotorSpeed(motorSpeed);
	}
}

function render() {

	game.debug.box2dWorld();

}
