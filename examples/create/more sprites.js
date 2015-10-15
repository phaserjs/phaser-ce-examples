
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create });

function create() {

    var pixelWidth = 6;
    var pixelHeight = 6;

    var chick = [
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

    game.create.texture('chick', chick, pixelWidth, pixelHeight);

    var burd = [
      '..E.............',
      '.DEEEEEEDDD.....',
      '..EEEEEEDDD.....',
      '..EE00EE77778666',
      '..EEEEEE77777666',
      '..EEEE7777777666',
      '..EEEE7655567666',
      'EEEEEE7777757666',
      'EEEEEEDD555.7666',
      '..DEEEEEDDD.....',
      '..EEEEEEDDD.....',
      '.7EEEEEEDDD.6...',
      '.77EEEEEDDD66...',
      '..77......66....'
    ];

    game.create.texture('burd', burd, pixelWidth, pixelHeight);

    var alien = [
      '....44........',
      '....44........',
      '......5.......',
      '......5.......',
      '....ABBBBA....',
      '...ABBBBBBA...',
      '..ABB8228BBA..',
      '..BB882288BB..',
      '.ABB885588BBA.',
      'BBBB885588BBBB',
      'BBBB788887BBBB',
      '.ABBB7777BBBA.',
      '.ABBBBBBBBBBA.',
      '.AABBBBBBBBAA.',
      '.AAAAAAAAAAAA.',
      '.5AAAAAAAAAA5.'
    ];
    
    game.create.texture('alien', alien, pixelWidth, pixelHeight);

    var ufo = [
      '....DDDDDDDD....',
      '...DDEEDDDDDD...',
      '..DDDEEDDDDDDD..',
      '..DDDDDDDDDDDD..',
      '..DDDD5555DDDD..',
      '..DDD555555DDD..',
      '..DDD555555DDD..',
      '..DDD555555DDD..',
      '..334244333333..',
      '.33344443333333.',
      '3333444433333333',
      '....5...5..5....',
      '...5....5...5...',
      '.66....66....66.',
      '.66....66....66.'
    ];

    game.create.texture('ufo', ufo, pixelWidth, pixelHeight);

    var star = [
      '.....828.....',
      '....72227....',
      '....82228....',
      '...7222227...',
      '2222222222222',
      '8222222222228',
      '.72222222227.',
      '..787777787..',
      '..877777778..',
      '.78778887787.',
      '.27887.78872.',
      '.787.....787.'
    ];
    
    game.create.texture('star', star, pixelWidth, pixelHeight);

    var ship = [
      '.....DEEEEEED...',
      '.....EEEEEFFE...',
      '.....EEEDDFFE...',
      '334..EEDDDDEE...',
      '3333.EEDDDDEE...',
      '33333EEDDDDEE...',
      '.FF2222222222F..',
      '.F222222222222F.',
      '.22222222222222F',
      '4443322222222222',
      '44433FFFFFFFFFFF',
      '.111FFFFFFFFFFF.',
      '.11FFFFFFFFFFF..',
      '.1FFFFFFFFFF1...',
      '...3333.........',
      '...333..........'
    ];

    game.create.texture('ship', ship, pixelWidth, pixelHeight);

    var cat = [
      '....443...443.',
      '...4433..4433.',
      '..44333.48333.',
      '88888888244444',
      '44444444433333',
      '44444444433333',
      '44044404433333',
      '44488844433333',
      '44400044433333',
      '44F202F4433333',
      '44202024433333',
      '44F222F4433333',
      '44444444433333',
      '4433...4433.33',
      '4433...4433.33'
    ];
    
    game.create.texture('cat', cat, pixelWidth, pixelHeight);

    var joypad = [
      '........65....5.',
      '.......5..5..5..',
      '.......5...55...',
      '.......5........',
      '.51FFFFFFFFFF15.',
      '51FFFFFFFFEEFF15',
      '1FF55FFFFFEEFFF1',
      'FF5555FFFFFFF33F',
      'FF0000FFAAFFF33F',
      'FF1001FFAAFFFFFF',
      'FFF11FFFFFF88FFF',
      '2FFFFF2222F88FF2',
      '1222221111222221',
      '11FFF111111FFF11',
      '.1FFF1....1FFF1.',
      '..111......111..'
    ];

    game.create.texture('joypad', joypad, pixelWidth, pixelHeight);

    var joystick = [
      '..............',
      '....533335....',
      '....348333....',
      '....344333....',
      '....333533....',
      '....533335....',
      '......55......',
      '......33......',
      '......33......',
      '......55......',
      '....551155....',
      '.343556655343.',
      '61111111111116',
      '50000000000005',
      '50000000000005',
      '55555555555555',
      '.555......555.'
    ];

    game.create.texture('joystick', joystick, pixelWidth, pixelHeight);

    game.add.sprite(150, 200, 'chick').anchor.y = 1;
    game.add.sprite(350, 200, 'burd').anchor.y = 1;
    game.add.sprite(550, 200, 'alien').anchor.y = 1;

    game.add.sprite(150, 350, 'ufo').anchor.y = 1;
    game.add.sprite(350, 350, 'star').anchor.y = 1;
    game.add.sprite(550, 350, 'ship').anchor.y = 1;

    game.add.sprite(150, 500, 'cat').anchor.y = 1;
    game.add.sprite(350, 500, 'joystick').anchor.y = 1;
    game.add.sprite(550, 500, 'joypad').anchor.y = 1;

}
