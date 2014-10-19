/*
This example shows how to use flowing animations inside your game so that each animation can follow on from the previous one.
In the example you will see that the ship will animate for left when the left button is down and then left returning to center 
when the button is released.

Check out our game blog at http://twowaves.co.za/wp/game-catsharkship/ 

- Shankspranks
*/

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    // here we need to detail the sprite name, file location, sprite single frame width, sprite single frame height
    game.load.spritesheet('catship', 'assets/sprites/catship.png', 55, 42);
    game.load.image('stage1', 'assets/pics/terrain.jpg');

}

var ship;
var shipvelocity = 500;
var shipMaxVelocity = 500;
var frameSpeed = 40; // This is how fast the frame rate of the aimation will be in fps
var stage1;
var currentFrame = 0;

function create() {



    stage1 = this.game.add.image(0, 0, 'stage1');

    //  Create our ship sprite
    ship = this.game.add.sprite(55, 42, 'catship');

    // Center it roughly 1/3 from the bottom & in the middle of the screen.
    ship.y = this.game.world.height * 0.66;
    ship.x = this.game.world.width * 0.5;

    // This sets the relative anchor of the ship to mid point to achieve above positioning
    ship.anchor.set(0.5);

    //  Six animations in total 

    // Here we can lay out all the animations of the ship
    // name, frmae sequence, default frame speed, debug
    ship.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], frameSpeed, false);
    ship.animations.add('leftReturn', [9, 8, 7, 6, 5, 4, 3, 2, 1, 0], frameSpeed, false);
    ship.animations.add('boost', [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], frameSpeed, false);
    ship.animations.add('right', [20, 21, 22, 23, 24, 25, 26, 27, 28, 29], frameSpeed, false);
    ship.animations.add('rightReturn', [29, 28, 27, 26, 25, 24, 23, 22, 21, 20], frameSpeed, false);    
    
    // I use this last dummy animation as an anchor to get the manager to run a couple frames and tell us when we are at axis 0. 
    ship.animations.add('fly', [0, 1, 0], frameSpeed, false); 

    //  Add the ships physics settings

    this.game.physics.enable(ship, Phaser.Physics.ARCADE);
    ship.body.maxVelocity.set(shipMaxVelocity);
    ship.body.collideWorldBounds = true;


    // The Controls
    cursors = this.game.input.keyboard.createCursorKeys();

}


function update() {

        // Always reset the velocity to zero for top down shooters, rather use the ground to create the forward momentum
        ship.body.velocity.x = 0;
        ship.body.velocity.y = 0;

        // In phaser 2.1 you need to chekc if the animation manager is running first before you attempt to return the current frame
        if (ship.animations.currentFrame) {
            currentFrame = ship.animations.currentFrame.index;
        }

        // Here we give the ship the ability to move using velocity in 8 directions
        // We use logic to determine where in the ships animation it is and then play the relevant follow on animation
        // For instance if the ship is currently rotated all the way right and the user lets go of the button we want the ship to rotate back to center.

        if ((cursors.left.isDown) && (cursors.up.isUp) && (cursors.down.isUp)) {

            ship.body.velocity.x = -shipvelocity;

            if (currentFrame == 0 || currentFrame == 20 || currentFrame == 10) {
                ship.animations.play('left', frameSpeed, false);
            }
            if (currentFrame == 29) {
                ship.animations.play('rightReturn', frameSpeed, false);
                if (ship.animations.currentFrame) { currentFrame = ship.animations.currentFrame.index; }
            }
        }
        else if ((cursors.left.isDown) && (cursors.up.isDown)) {

            ship.body.velocity.x = -shipvelocity;
            ship.body.velocity.y = -shipvelocity / 2;

            if (currentFrame == 0 || currentFrame == 20 || currentFrame == 10) {
                ship.animations.play('left', frameSpeed, false);
            }
            if (currentFrame == 29) {
                ship.animations.play('rightReturn', frameSpeed, false);
                if (ship.animations.currentFrame) { currentFrame = ship.animations.currentFrame.index; }
            }
        }
        else if ((cursors.left.isDown) && (cursors.down.isDown)) {

            ship.body.velocity.x = -shipvelocity;
            ship.body.velocity.y = +shipvelocity / 2;

            if (currentFrame == 0 || currentFrame == 20 || currentFrame == 10) {
                ship.animations.play('left', frameSpeed, false);
            }
            if (currentFrame == 29) {
                ship.animations.play('rightReturn', frameSpeed, false);
                if (ship.animations.currentFrame) { currentFrame = ship.animations.currentFrame.index; }
            }
        }
        else if ((cursors.right.isDown) && (cursors.up.isUp) && (cursors.down.isUp)) {

            ship.body.velocity.x = shipvelocity;

            if (currentFrame == 0 || currentFrame == 20 || currentFrame == 10) {
                ship.animations.play('right', frameSpeed, false);
                if (ship.animations.currentFrame) { currentFrame = ship.animations.currentFrame.index; }
            }
            if (currentFrame == 9) {
                ship.animations.play('leftReturn', frameSpeed, false);
                if (ship.animations.currentFrame) { currentFrame = ship.animations.currentFrame.index; }
            }

        }
        else if ((cursors.right.isDown) && (cursors.up.isDown)) {

            ship.body.velocity.x = shipvelocity;
            ship.body.velocity.y = -shipvelocity / 2;

            if (currentFrame == 0 || currentFrame == 20 || currentFrame == 10) {
                ship.animations.play('right', frameSpeed, false);
                if (ship.animations.currentFrame) { currentFrame = ship.animations.currentFrame.index; }
            }
            if (currentFrame == 9) {
                ship.animations.play('leftReturn', frameSpeed, false);
                if (ship.animations.currentFrame) { currentFrame = ship.animations.currentFrame.index; }
            }

        }
        else if ((cursors.right.isDown) && (cursors.down.isDown)) {

            ship.body.velocity.x = shipvelocity;
            ship.body.velocity.y = shipvelocity / 2;

            if (currentFrame == 0 || currentFrame == 20 || currentFrame == 10) {
                ship.animations.play('right', frameSpeed, false);
                if (ship.animations.currentFrame) { currentFrame = ship.animations.currentFrame.index; }
            }
            if (currentFrame == 9) {
                ship.animations.play('leftReturn', frameSpeed, false);
                if (ship.animations.currentFrame) { currentFrame = ship.animations.currentFrame.index; }
            }

        }
        else if ((cursors.up.isDown) && (cursors.left.isUp) && (cursors.right.isUp)) {
            // Hit the boosters!!
            ship.body.velocity.y = -shipvelocity / 2;
            if (currentFrame == 0 || currentFrame == 20 || currentFrame == 10) {
                ship.animations.play('boost', frameSpeed, false);
                if (ship.animations.currentFrame) { currentFrame = ship.animations.currentFrame.index; }
            }
        }
        else if (cursors.down.isDown) {

            ship.body.velocity.y = shipvelocity / 2;

            if (currentFrame == 0 || currentFrame == 10 || currentFrame == 20 || currentFrame == 19)
                ship.animations.play('fly');
            if (ship.animations.currentFrame) { currentFrame = ship.animations.currentFrame.index; }
        }
        else if (currentFrame == 29) {
            ship.animations.play('rightReturn', frameSpeed, false);
            if (ship.animations.currentFrame) { currentFrame = ship.animations.currentFrame.index; }
        }
        else if (currentFrame == 19) {
            ship.animations.play('fly', frameSpeed, false);
            if (ship.animations.currentFrame) { currentFrame = ship.animations.currentFrame.index; }
        }
        else if (currentFrame == 9) {
            ship.animations.play('leftReturn', frameSpeed, false);
            if (ship.animations.currentFrame) { currentFrame = ship.animations.currentFrame.index; }
        }

    }



function render() {

}