
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', this);

function create() {

    var data = [
        ' 333 ',
        ' 777 ',
        'E333E',
        ' 333 ',
        ' 3 3 '
    ];

    game.create.texture('bob', data);

    var data2 = [
        ' 4444 ',
        '4    4',
        '4    4',
        '4    4',
        '4    4',
        ' 4444 ',
    ];

    game.create.texture('ball', data2);

    //  Just create some sprites using these new textures
    game.add.sprite(0, 0, 'bob');
    game.add.sprite(100, 60, 'ball');
    game.add.sprite(200, 120, 'bob');

}

function update() {


}
