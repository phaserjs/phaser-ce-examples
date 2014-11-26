var worldwidth=900;
var worldheight=500;
var gummi;
var constraintcount = 0;
var hitSprite = false;


var BootState = {
    preload: function() {
    },
    create: function() {
             game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
             game.scale.maxWidth = worldwidth;
             game.scale.maxHeight = worldheight;
             game.scale.pageAlignHorizontally = true;
             game.scale.pageAlignVertically = true;
             game.scale.setScreenSize(true);
        game.state.start('preload');
    }
}



var PreloadState = {
    preload: function() {
        game.load.image('gummi', 'wip/gummi.png');
        game.load.image('cow', 'wip/cow48.png');
    },
    create: function() {
       game.state.start('menu'); 
    }
}




/////   MENU START ////////
var Menu = {
    create: function () {
        setupMenuEvironment();
        setupMouseAnchor();

        this.input.addMoveCallback(this.moveSpring, this);

    },

    moveSpring: function (pointer, x, y, isDown) {

        // console.log(arguments);

        mouseAnchor.body.x = game.camera.x+x;
        mouseAnchor.body.y = game.camera.y+y;

        // updateSpringAssets(isDown);

        // gummi.angle = angleBetween(mouseAnchor,hitSprite)+90;
        // gummi.height = distanceBetween(mouseAnchor, hitSprite);
        // gummi.x = hitSprite.x;
        // gummi.y = hitSprite.y;

    },

    update: function () {
        // mouseAnchor.body.x = game.camera.x+game.input.x;
        // mouseAnchor.body.y = game.camera.y+game.input.y;
        updateSpringAssets();
        gummi.angle = angleBetween(mouseAnchor,hitSprite)+90;
        gummi.height = distanceBetween(mouseAnchor, hitSprite);
        gummi.x = hitSprite.x;
        gummi.y = hitSprite.y;
    },

    render: function () {

        var n = 'n/a';

        if (hitSprite)
        {
            n = hitSprite.name;
        }

        this.game.debug.text('hs: ' + n, 32, 32);

        if (cow)
        {
            this.game.debug.spriteInfo(cow, 32, 64);
        }

    }

}

function setupMenuEvironment(){
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.defaultRestitution = 0.4 ;
     setupSpringCow();
}
/////   MENU END  ////////






function setupMouseAnchor(){
     //create mouseAnchor to connect with
    mouseAnchor = game.add.sprite(0, 0);
    mouseAnchor.visible=false;
    game.physics.p2.enable(mouseAnchor,false);
    mouseAnchor.body.static = true;
    mouseAnchor.body.setCircle(10);
    mouseAnchor.anchor.setTo(0.5,0);
    mouseAnchor.body.data.shapes[0].sensor = true;

    gummi = game.add.image(0, 0, 'gummi');
    gummi.width = 5;
    gummi.height= 4;
    gummi.visible=false;
    gummi.anchor.setTo(0.5,0);
//     finishlines.add(gummi);
}



function setupSpringCow(cow){
    cow = game.add.sprite(200,200,'cow')
    cow.name ="springcow";
    game.physics.p2.enable(cow,true);
    // cow.body.static = true;
    cow.body.setCircle(20);
    cow.body.data.gravityScale=0;
}






function checkHit(x,y){  //gets actual P2 bodies and returns its SPRITE
    var hitObjects = game.physics.p2.hitTest({x: mouseAnchor.x, y: mouseAnchor.y});
    for (i=0; i<hitObjects.length;i++){
        if (hitObjects[i].parent.sprite && hitObjects[i].parent.sprite.name =="springcow"   && !hitObjects[i].parent.sprite.onAir) { 
            hitSprite=hitObjects[i].parent.sprite; 
            return true;  
        }
 }
    return false;
}

function clearAllTies(){
    constraintcount = 0 
    if (mouseAnchor && mouseAnchor.body) {mouseAnchor.body.x = 0; mouseAnchor.body.y = 0;} //reset mouseAnchor to avoid selecting something at a position from the former frame
    var allSprings = game.physics.p2.getSprings();
    if (allSprings.length > 0){       for (i=0; i<=allSprings.length; i++){ game.physics.p2.removeSpring(allSprings[i]);}   }
}


function distanceBetween(spriteA,spriteB){
    var dx = spriteA.x - spriteB.x;  //distance ship X to enemy X
    var dy = spriteA.y - spriteB.y;  //distance ship Y to enemy Y
    var dist = Math.sqrt(dx*dx + dy*dy);     //pythagoras ^^  (get the distance to each other)
    return dist;
}

function angleBetween(obj1, obj2) {
    var angle = (Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x))* 180/Math.PI; //return radians * 180/Math.PI; // returns degrees
    return angle;
}












//----------------------------------//
//          UPDATE LOOP             //
//----------------------------------//


// functions running in UPDATE loop
function updateSpringAssets(isDown){  //hitSprite is the sprite you just hit (if its draggable by springs) and set by the checkHit function

    if (game.input.activePointer.isDown && constraintcount === 0 && checkHit() && !(game.input.pointer1.isDown && game.input.pointer2.isDown))
    {
        follow = false;
        constraintcount += 1;



        hitSprite.spring = game.physics.p2.createSpring(hitSprite, mouseAnchor, 0,6,1); //bodyA, bodyB, restLength, stiffness, damping, worldA, worldB, localA, localB

        gummi.visible=true;
   }

    if (!game.input.activePointer.isDown){  // clear ties on mouseup and follow one of the assets  or players 
        gummi.visible=false;
        if (constraintcount !== 0) { clearAllTies(); }   // don't run it 60 times per second - only if neccesary
        else if (hitSprite){ follow = hitSprite; } //highest priority - follow hitobject in case there is one.. 
    }

}







var game = new Phaser.Game(worldwidth, worldheight, Phaser.CANVAS, 'phaser-example', {});

game.state.add('boot', BootState, true);
game.state.add('preload', PreloadState, false);
game.state.add('menu', Menu, false);

