
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, render: render });

var bmd;
var sprite;

function preload() {

    console.log('Preload');

    bmd = game.add.bitmapData(300, 200);
    bmd.ctx.fillStyle = '#00FF00';
    bmd.ctx.beginPath();
    bmd.ctx.arc(150, 100 ,50, 0, Math.PI * 2, true);
    bmd.ctx.closePath();
    bmd.ctx.fill();

}

function create() {

    console.log('Create', world.width, world.height);

    game.renderer.renderSession.roundPixels = true;
    world.resize(4704, 600);
    physics.startSystem(Phaser.Physics.ARCADE);
    
    sprite = game.add.sprite(155, 300, bmd);
    sprite.anchor.set(0.5);
    physics.arcade.enable(sprite);
    sprite.body.collideWorldBounds = true;

    console.log(sprite.position);
    
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add
        (function(key) {
            camera.x += 50;
        }, this);
        
    game.input.keyboard.addKey(Phaser.Keyboard.R).onDown.add
        (function(key) {
            game.state.restart();
        }, this);
}

function render() {
    game.debug.text(world.x, 32, 320);
    game.debug.cameraInfo(camera, 500, 32);
    game.debug.spriteCoords(sprite, 32, 32);
}
