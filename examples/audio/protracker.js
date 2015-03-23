var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var mods = [];
var current = 0;

var vumeter = [];
var channels = [];

var module;

function preload() {

    game.load.script('protracker', '_plugins/ProTracker.js');

    game.load.image('vu', 'assets/sprites/vu.png');
    game.load.image('logo', 'assets/sprites/soundtracker.png');
    game.load.image('bg', 'assets/skies/sky2.png');
    game.load.image('vulkaiser', 'assets/pics/vulkaiser_red.png');

    game.load.binary('shampoo', 'assets/audio/protracker/shampoo.mod', modLoaded, this);
    game.load.binary('macrocosm', 'assets/audio/protracker/macrocosm.mod', modLoaded, this);
    game.load.binary('impulse', 'assets/audio/protracker/act_of_impulse.mod', modLoaded, this);
    game.load.binary('enigma', 'assets/audio/protracker/enigma.mod', modLoaded, this);
    game.load.binary('elysium', 'assets/audio/protracker/elysium.mod', modLoaded, this);
    game.load.binary('stardust', 'assets/audio/protracker/sd-ingame1.mod', modLoaded, this);
    game.load.binary('globaltrash', 'assets/audio/protracker/global_trash_3_v2.mod', modLoaded, this);

}

function modLoaded(key, data) {

    mods.push(key);
    var buffer = new Uint8Array(data);
    return buffer;

}

function load_next_module()
{
    current == mods.length - 1 ? current = 0 : current++;

    module.stop();
    module.clearsong();

    module.buffer = game.cache.getBinary(mods[current]);
    module.parse();

    // BUG if width==0
    // for (var i = 0; i < vumeter.length; i++)
    // {
    //     vumeter[i].width = 1;
    // }

}

function create() {

    game.add.sprite(0, 0, 'bg');
    game.add.sprite(500, 32, 'logo');
    game.add.sprite(580, 371, 'vulkaiser');

    for (var i = 0, y = 200; i < 4; i++, y += 50)
    {
        vumeter[i] = game.add.sprite(400, y, 'vu');
        vumeter[i].crop(new Phaser.Rectangle(0, 0, 300, 30));
    }

    module = new Protracker();

    //module.play() has to be called from a callback
    module.onReady = function() {
        module.play();
    };

    module.buffer = game.cache.getBinary(mods[current]);
    module.parse();

    game.input.onDown.add(load_next_module, this);

}

function update() {

    //  module.sample = array of Objects containing informations about a played sample

    for (var i = 0; i < vumeter.length; i++)
    {
        if (module.channel[i])
        {
            var smp_index = module.channel[i].sample;
            channels[i] = { sample_index:smp_index, sample_name: module.sample[smp_index].name };

            var w = Math.round(module.vu[i] * 1200);

            if (w > 300)
            {
                w = 300;
            }

            vumeter[i].cropRect.width = w;
            vumeter[i].updateCrop();
        }
    }

}

function render() {

    for (var i = 0, y = 32; i < vumeter.length; i++, y += 32)
    {
        if (channels[i])
        {
            game.debug.text('Channel #' + i + ' : sample ' + channels[i].sample_index + '  ' + channels[i].sample_name, 16, y);
            // game.debug.text('vu' + i + ': ' + module.vu[i], 16, 350 + y);
        }
    }

    game.debug.text('Position: ' + module.position, 16, 160);
    game.debug.text('Pattern: ' + module.row, 16, 192);
    game.debug.text('BPM: ' + module.bpm, 16, 224);
    game.debug.text('Speed: ' + module.speed, 16, 256);
    game.debug.text('Name: ' + module.title, 16, 288);
    game.debug.text('Signature: ' + module.signature, 16, 320);

}