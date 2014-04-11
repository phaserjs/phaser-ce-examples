var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {
    game.load.image('clouds', 'assets/misc/clouds.jpg');
    game.load.spritesheet('chain','./assets/sprites/chain.png',16,26);
}



function create() {
//     game.add.tileSprite(0, 0, 800, 600, 'clouds');
    game.physics.startSystem(Phaser.Physics.P2JS);  //activate physics
    game.physics.p2.gravity.y = 1200;  //realistic gravity

    createRope(40,400,100);  // (length, xAnchor, yAnchor)
};



function createRope(length, xAnchor,yAnchor){
    var lastRect;  //if we created our first rect this will contain it
    var height = 20;  //height for the physics body - your image height is 8px
    var width = 16;   //this is the width for the physics body.. if to small the rectangles will get scrambled together
    var maxForce =20000;  //the force that holds the rectangles together
    for(var i=0; i<=length; i++){
        var x = xAnchor;                 // all rects are on the same x position
        var y = yAnchor+(i*height);               // every new rects is positioned below the last
        if (i%2==0){newRect = game.add.sprite(x, y, 'chain',1);}   //add sprite (and switch frame every 2nd time)
        else {newRect = game.add.sprite(x, y, 'chain',0); lastRect.bringToTop();}  //optical polish
        game.physics.p2.enable(newRect,false);      // enable physicsbody
        newRect.body.setRectangle(width,height);    //set custom rectangle

        if (i==0){newRect.body.static=true; }  //anchor the first one created
        else{  
            newRect.body.velocity.x =200;   //give it a push :) just for fun
            newRect.body.mass =  length/i;  // reduce mass for evey rope element
        }
        //after the first rectangle is created we can add the constraint
        if(lastRect){game.physics.p2.createRevoluteConstraint(newRect, [0,-10], lastRect, [0,10], maxForce);}
        lastRect = newRect;
    }; 
}

