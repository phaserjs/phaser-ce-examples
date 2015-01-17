// Art and code by Vengadora
// Get in touch!! vengadoravg@gmail.com
// art is released as public domain

var mainState = ( function () {

    var preload = function () {
        game.load.tilemap('cave', 'assets/tilemaps/maps/cave.json', null, Phaser.Tilemap.TILED_JSON);

        game.load.image('dirt', 'assets/tilemaps/tiles/dirt.png');
        game.load.image( 'background', 'assets/textures/caveBackground.png' );
        game.load.spritesheet( 'digger', 'assets/sprites/digger.png', 30,30);
    };

    var create = function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // set a tile background
        game.add.tileSprite(0,0, game.world.width, game.world.height, 'background');

        // setting up the tilemap
        this.tilemap = game.add.tilemap('cave', 30, 30, 30*25, 30*19);
        this.tilemap.addTilesetImage('dirt');

        // creating the layer of the tilemap
        // ('layer' is the name of the layer of the tilemap created on tiled)
        this.tilemap.cave = this.tilemap.createLayer('layer');
        this.tilemap.cave.resizeWorld();

        // activating collisions for this layer
        game.physics.arcade.enable(this.tilemap.cave);
        this.tilemap.setCollisionByExclusion([], true, this.tilemap.cave);

        // creating the digger sprite.
        this.digger = game.add.sprite(30,30,'digger');
        this.digger.animations.add('stand', [0]);
        this.digger.animations.add('walk', [1,2], 4, true);
        this.digger.animations.add('dig', [3,4], 4, true);
        this.digger.animations.play('walk');
        game.physics.arcade.enable(this.digger);
        this.digger.body.acceleration.y = 300;
        // some usefull properties
        this.digger.timeTakenToDig = 100;
        this.digger.timeElapsedDigging = 0;

        // cursor listener
        this.cursor = game.input.keyboard.createCursorKeys();
    };

    var update = function () {
        game.physics.arcade.collide(this.digger, this.tilemap.cave);
        this.digger.body.velocity.x = 0;

        if (this.cursor.down.isDown) {
            this.digger.animations.play('dig');
            this.digger.timeElapsedDigging++;

            if (this.digger.timeElapsedDigging >= this.digger.timeTakenToDig) {
                this.digger.timeElapsedDigging = 0;
                // calculating the tile's coordinates below the digger
                var downX = Math.round(this.digger.x/this.tilemap.tileWidth);
                var downY = Math.round(this.digger.y/this.tilemap.tileHeight + 1);

                // removing the tile on that coordinates.
                // 1 is the index of the dirt that can be removed.
                if (this.tilemap.getTile(downX, downY) &&
                    this.tilemap.getTile(downX, downY).index == 1) {
                    this.tilemap.removeTile(downX, downY);
                }
            }

        } else {
            this.digger.timeElapsedDigging = 0;

            if (this.cursor.up.isDown && this.digger.body.blocked.down) {
                this.digger.body.velocity.y = -200;
            }
            if (this.cursor.left.isDown) {
                this.digger.animations.play('walk');
                this.digger.body.velocity.x = -80;
            } else if (this.cursor.right.isDown) {
                this.digger.animations.play('walk');
                this.digger.body.velocity.x = 80;
            } else {
                this.digger.animations.play('stand');
            }
        }

    };

    return { preload : preload,
             create : create,
             update : update };

})();

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example');
game.state.add('main', mainState);
game.state.start('main');
