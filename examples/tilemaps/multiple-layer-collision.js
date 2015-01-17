// example code by Vengadora
// get in touch!! vengadoravg@gmail.com

var MESSAGES = ['you are standing on myLayer[0] where water has no collision',
                'you are standing on myLayer[1] where stone has no collision',
                'you are standing on myLayer[2] where plant has no collision',
                'you are standing on myLayer[3] where bush has no collision'];
var MAP_OBJECTS_INDEX = [59, 32, 15, 14]; // tile's index of: water, stone, plant and bush

var mainState = ( function () {

    var preload = function () {
        game.load.tilemap( 'multilayered-platformer', 'assets/tilemaps/maps/multilayered-map.json', null, Phaser.Tilemap.TILED_JSON );
        game.load.image('platformer_tiles', 'assets/tilemaps/tiles/platformer_tiles.png');
        game.load.spritesheet('phaser-dude', 'assets/sprites/phaser-dude.png', 27, 40);
    }

    var create = function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#99f';

        this.phaserDude = game.add.sprite(20,20, 'phaser-dude');
        game.physics.arcade.enable(this.phaserDude);
        this.phaserDude.body.acceleration.y = 400; // setting up gravity

        // setting up tilemap
        this.tilemap = game.add.tilemap('multilayered-platformer', 16, 16, 800, 600);
        this.tilemap.addTilesetImage('platformer_tiles');

        // setting up layers for the tilemap.
        this.tilemap.myLayers = [];
        // multilayered-plataformer tilemap has 4 layers named:
        //     layer1, layer2, layer3 and layer4
        for (var i=4; i>0; i--) {
            var layer = this.tilemap.createLayer('layer' + i);
            // enabling collisions for this layer
            game.physics.arcade.enable(layer);
            // setting collision for one different item at each layer.
            this.tilemap.setCollisionByExclusion([MAP_OBJECTS_INDEX[i-1]], true, layer);
            // setting a different transparency to each layer
            layer.alpha = (5-i)/4;
            this.tilemap.myLayers[i-1] = layer;
        }

        // myLayer[0] won't collide on WATER
        // myLayer[1] won't collide on STONE
        // myLayer[2] won't collide on PLANT
        // myLayer[3] won't collide on BUSH

        // The last added layer will be the most-a-top layer drawed.

        cursor = game.input.keyboard.createCursorKeys();
        var style = { font: '10px Mono', fill: '#000', align: 'right' };
        text = game.add.text(20, 20, 'you are not standing on the floor', style);
    }

    var update = function () {
        text.setText('you are not standing on the floor');
        for (var i=0; i<4; i++) {
            game.physics.arcade.collide(this.tilemap.myLayers[i], this.phaserDude, collisionHandler(i));
        }

        if (cursor.up.isDown && this.phaserDude.body.blocked.down) {
            this.phaserDude.body.velocity.y = -250;
        }

        this.phaserDude.body.velocity.x = 0;
        if (cursor.right.isDown) {
            this.phaserDude.body.velocity.x = 150;
        } else if (cursor.left.isDown) {
            this.phaserDude.body.velocity.x = -150;
        }
    };

    this.collisionHandler = function (index) {
        return function (sprite, layer) {
            text.setText(MESSAGES[index]);
        };
    };

    return { preload : preload,
             create : create,
             update : update };

})();

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example');
game.state.add('main', mainState);
game.state.start('main');
