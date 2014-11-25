var P2Game = {};

P2Game.StateA = function (game) {

    this.contra;
    this.block;
    this.tetris1;
    this.changeTimer;

    this.cursors;

    this.result = 'Move with cursors. Hit an object to change State';

};

P2Game.StateA.prototype = {

    preload: function () {

        this.load.image('contra2', 'assets/pics/contra2.png');
        this.load.image('block', 'assets/sprites/block.png');
        this.load.image('tetrisblock1', 'assets/sprites/tetrisblock1.png');

        this.load.physics('physicsData', 'assets/physics/sprites.json');

    },

    create: function () {

        this.game.stage.backgroundColor = '#806000';

        this.physics.startSystem(Phaser.Physics.P2JS);

        this.physics.p2.restitution = 0.9;

        this.contra = this.add.sprite(200, 200, 'contra2');
        this.block = this.add.sprite(500, 200, 'block');
        this.tetris1 = this.add.sprite(100, 450, 'tetrisblock1');

        this.physics.p2.enable([ this.contra, this.block, this.tetris1 ], false);

        this.contra.body.clearShapes();
        this.contra.body.loadPolygon('physicsData', 'contra2');

        this.tetris1.body.clearShapes();
        this.tetris1.body.loadPolygon('physicsData', 'tetrisblock1');

        this.cursors = this.input.keyboard.createCursorKeys();

        this.block.body.onBeginContact.add(this.blockHit, this);

    },

    blockHit: function (body, shapeA, shapeB, equation) {

        //  We hit the wall, not a sprite
        if (body === null) { return; }

        if (body.sprite.key === 'contra2')
        {
           this.changeTimer = this.game.time.events.add(3000, this.gotoStateB, this);
        }
        else if (body.sprite.key === 'tetrisblock1')
        {
           this.changeTimer = this.game.time.events.add(3000, this.gotoStateC, this);
        }

    },

    gotoStateB: function () {

        this.state.start('StateB');

    },

    gotoStateC: function () {

        this.state.start('StateC');

    },

    update: function () {

        this.block.body.setZeroVelocity();

        if (this.cursors.left.isDown)
        {
            this.block.body.moveLeft(200);
        }
        else if (this.cursors.right.isDown)
        {
            this.block.body.moveRight(200);
        }

        if (this.cursors.up.isDown)
        {
            this.block.body.moveUp(200);
        }
        else if (this.cursors.down.isDown)
        {
            this.block.body.moveDown(200);
        }

    },

    render: function () {

        if (this.changeTimer)
        {
            this.game.debug.text('Changing in: ' + game.time.events.duration, 32, 32);
        }
        else
        {
            this.game.debug.text(this.result, 32, 32);
        }

        this.game.debug.text("State A", 32, 560);

    }

};

//  State B

P2Game.StateB = function (game) {

    this.contra;
    this.block;
    this.tetris1;
    this.changeTimer;

    this.cursors;

    this.result = 'Move with cursors. Hit an object to change State';

};

P2Game.StateB.prototype = {

    create: function () {

        this.game.stage.backgroundColor = '#008060';

        this.physics.startSystem(Phaser.Physics.P2JS);

        this.physics.p2.restitution = 0.9;

        this.contra = this.add.sprite(500, 200, 'contra2');
        this.block = this.add.sprite(200, 200, 'block');
        this.tetris1 = this.add.sprite(300, 450, 'tetrisblock1');

        this.physics.p2.enable([ this.contra, this.block, this.tetris1 ], false);

        this.contra.body.clearShapes();
        this.contra.body.loadPolygon('physicsData', 'contra2');

        this.tetris1.body.clearShapes();
        this.tetris1.body.loadPolygon('physicsData', 'tetrisblock1');

        this.cursors = this.input.keyboard.createCursorKeys();

        this.block.body.onBeginContact.add(this.blockHit, this);

    },

    blockHit: function (body, shapeA, shapeB, equation) {

        //  We hit the wall, not a sprite
        if (body === null) { return; }

        if (body.sprite.key === 'contra2')
        {
           this.changeTimer = this.game.time.events.add(3000, this.gotoStateA, this);
        }
        else if (body.sprite.key === 'tetrisblock1')
        {
           this.changeTimer = this.game.time.events.add(3000, this.gotoStateC, this);
        }

    },

    gotoStateA: function () {

        this.state.start('StateA');

    },

    gotoStateC: function () {

        this.state.start('StateC');

    },

    update: function () {

        this.block.body.setZeroVelocity();

        if (this.cursors.left.isDown)
        {
            this.block.body.moveLeft(200);
        }
        else if (this.cursors.right.isDown)
        {
            this.block.body.moveRight(200);
        }

        if (this.cursors.up.isDown)
        {
            this.block.body.moveUp(200);
        }
        else if (this.cursors.down.isDown)
        {
            this.block.body.moveDown(200);
        }

    },

    render: function () {

        if (this.changeTimer)
        {
            this.game.debug.text('Changing in: ' + game.time.events.duration, 32, 32);
        }
        else
        {
            this.game.debug.text(this.result, 32, 32);
        }

        this.game.debug.text("State B", 32, 560);

    }

};

//  State C

P2Game.StateC = function (game) {

    this.contra;
    this.block;
    this.tetris1;
    this.changeTimer;

    this.cursors;

    this.result = 'Move with cursors. Hit an object to change State';

};

P2Game.StateC.prototype = {

    create: function () {

        this.game.stage.backgroundColor = '#004a80';

        this.physics.startSystem(Phaser.Physics.P2JS);

        this.physics.p2.restitution = 0.5;

        this.contra = this.add.sprite(500, 300, 'contra2');
        this.block = this.add.sprite(100, 500, 'block');
        this.tetris1 = this.add.sprite(200, 150, 'tetrisblock1');

        this.physics.p2.enable([ this.contra, this.block, this.tetris1 ], false);

        this.contra.body.clearShapes();
        this.contra.body.loadPolygon('physicsData', 'contra2');

        this.tetris1.body.clearShapes();
        this.tetris1.body.loadPolygon('physicsData', 'tetrisblock1');

        this.cursors = this.input.keyboard.createCursorKeys();

        this.block.body.onBeginContact.add(this.blockHit, this);

    },

    blockHit: function (body, shapeA, shapeB, equation) {

        //  We hit the wall, not a sprite
        if (body === null) { return; }

        if (body.sprite.key === 'contra2')
        {
           this.changeTimer = this.game.time.events.add(3000, this.gotoStateA, this);
        }
        else if (body.sprite.key === 'tetrisblock1')
        {
           this.changeTimer = this.game.time.events.add(3000, this.gotoStateB, this);
        }

    },

    gotoStateA: function () {

        this.state.start('StateA');

    },

    gotoStateB: function () {

        this.state.start('StateB');

    },

    update: function () {

        this.block.body.setZeroVelocity();

        if (this.cursors.left.isDown)
        {
            this.block.body.moveLeft(200);
        }
        else if (this.cursors.right.isDown)
        {
            this.block.body.moveRight(200);
        }

        if (this.cursors.up.isDown)
        {
            this.block.body.moveUp(200);
        }
        else if (this.cursors.down.isDown)
        {
            this.block.body.moveDown(200);
        }

    },

    render: function () {

        if (this.changeTimer)
        {
            this.game.debug.text('Changing in: ' + game.time.events.duration, 32, 32);
        }
        else
        {
            this.game.debug.text(this.result, 32, 32);
        }

        this.game.debug.text("State C", 32, 560);

    }

};

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example');

game.state.add('StateA', P2Game.StateA);
game.state.add('StateB', P2Game.StateB);
game.state.add('StateC', P2Game.StateC);

game.state.start('StateA');
