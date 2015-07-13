
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

    var rat = [
        '.D...........',
        '18...........',
        '1D...........',
        '18.....1111..',
        '1D..111DDEE1.',
        '1811EEE18E0E1',
        '.1DEEEEEEEEED',
        '..1EEEEEE41..',
        '.11E41E1411..',
        '1111E1E1E111.',
        '.1111111111..'
    ];

    game.create.texture('rat', rat, 4, 4, 4);

var frame0 = [
    '66656',
    '55555',
    '65666',
    '55555',
    '66656'
];
game.create.texture('yourKey', frame0, 6, 6, 0);

var frame0 = [
    '...55.......',
    '.....5......',
    '...7888887..',
    '..788888887.',
    '..888088808.',
    '..888886666.',
    '..8888644444',
    '..8888645555',
    '888888644444',
    '88788776555.',
    '78788788876.',
    '56655677776.',
    '456777777654',
    '.4........4.'
];
game.create.texture('yourKey', frame0, 8, 8, 0);

var frame1 = [
    'AAAAA',
    'BAAAA',
    'AAABA',
    'AAAAA',
    'ABAAA'
];
game.create.texture('yourKey', frame1, 6, 6, 0);

var frame2 = [
    '.000.',
    '.777.',
    '22222',
    '.EEE.',
    '.E.E.'
];
game.create.texture('yourKey', frame2, 6, 6, 0);

var frame0 = [
    '.......3.....',
    '......333....',
    '....5343335..',
    '...332333333.',
    '..33333333333',
    '..37773337773',
    '..38587778583',
    '..38588888583',
    '..37888888873',
    '...333333333.',
    '.F....5556...',
    '3E34.6757.6..',
    '.E.55.666.5..',
    '......777.5..',
    '.....6..7....',
    '.....7..7....'
];
game.create.texture('yourKey', frame0, 4, 4, 0);

    //  Just create some sprites using these new textures
    game.add.sprite(0, 0, 'bob');
    game.add.sprite(100, 60, 'rat');

}
