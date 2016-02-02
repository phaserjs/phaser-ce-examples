var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

function preload() {

    game.load.spritesheet('trees', 'assets/tilemaps/tiles/walls_1x2.png', 32, 64);

}

function create() {

    group = game.add.group();

    var locs = [];

    for (var i = 0; i < 16; i++)
    {
        //  This line tests integer sorting
        // locs.push((i * 32) + Math.random());

        //  This one tests float sorting
        locs.push((i * 32) + Math.random());
    }

    console.log(locs);

    //  Shuffle our positions
    locs = Phaser.ArrayUtils.shuffle(locs);

    console.log(locs);

    for (var i = 0; i < 16; i++)
    {
        group.create(400, locs[i], 'trees', 0);
    }

    game.input.onDown.addOnce(sort, this);

}

function sort() {

    group.sort('y', Phaser.Group.SORT_ASCENDING);

    for (var i = 0; i < 16; i++)
    {
        console.log(group.children[i].z, '=', group.children[i].y);
    }

}

function render() {

    game.debug.text('Click to sort', 10, 20);

}
