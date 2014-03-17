var state1 = {
    preload: function() {
        game.load.spritesheet('mario', 'wip/mariospritesheet-small.png',50,50);
        game.load.image('paddle', 'wip/paddle.png'); 
    },
    create: function () { 
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);
        game.physics.p2.gravity.y = 1200;

        platform = game.add.sprite(150,  game.world.height - 300, 'paddle'); 
        platform.scale.setTo(0.5,0.2);
        game.physics.p2.enable(platform);

        player = game.add.sprite(150,  50, 'mario',1); 
        game.physics.p2.enable(player,true); 

        cursors = game.input.keyboard.createCursorKeys();
    },
    update: function () {
        if (cursors.left.isDown  ){ player.body.moveLeft(300);}
        else if (cursors.right.isDown ) {player.body.moveRight(300);} 
        else{ player.body.velocity.x=0;}

        if (player.body.x >= 500) {
            this.shutdown();
        }
    },
    shutdown: function(){
        game.state.start('start', true, false);
    }
}



var game = new Phaser.Game(800, 512, Phaser.CANVAS, 'phaser-example');
game.state.add('start', state1, true);
