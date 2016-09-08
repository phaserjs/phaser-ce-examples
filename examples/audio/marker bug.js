
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.spritesheet('button', 'assets/buttons/button_sprite_sheet.png', 193, 71);

    game.load.path = 'http://localhost/childrens-template-make-a-picture-2/skins/vanilla/';

    game.load.audio('menu', bob.audio.menu.files);
    // game.load.audio('tools', bob.audio.tools.files);

}

var button;
var menuFx;
// var toolsFx;

function create() {

    game.stage.backgroundColor = '#ffffff';

    menuFx = this.add.audio('menu');
    menuFx.override = true;

    for (var i = 0; i < bob.audio.menu.markers.length; i++)
    {
        var sample = bob.audio.menu.markers[i];

        menuFx.addMarker(sample[0], sample[1], sample[2]);
    }

    menuFx.play('praise wow great picture');

    // button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 2, 1, 0);

    // button.setOverSound(menuFx, 'save this picture');
    // button.setOverSound(menuFx, 'fuck off');
    // button.setDownSound(menuFx, 'save this picture');
    // button.setDownSound(menuFx, 'fuck off');

    // button.setOverSound(menuFx, 'done');
    // button.setDownSound(menuFx, 'praise well done');

    game.input.onDown.add(actionOnClick);

}

function actionOnClick () {

    menuFx.play('fuck off');

}

var bob = {

    "audio": {

        "menu": {

            "files": [ "audio/menu.mp3", "audio/menu.m4a", "audio/menu.ogg" ],
            "markers": [

                [ "press play", 0, 3.0 ],
                [ "audio off", 3.5, 1.2 ],
                [ "audio on", 5.0, 1.1 ],
                [ "help", 6.5, 0.7 ],
                [ "home", 7.5, 0.6 ],
                [ "exit", 7.5, 0.6 ],
                [ "how to play", 8.5, 1.0 ],
                [ "pause", 10.0, 0.7 ],
                [ "play", 11.0, 0.5 ],
                [ "choose a frame", 12.0, 2.1 ],
                [ "start no webcam", 14.5, 4.1 ],
                [ "start webcam", 19.0, 5.5 ],
                [ "choose one of the frames and save your picture", 25.0, 2.6 ],
                [ "frame your picture", 28.0, 1.2 ],
                [ "lets make a picture", 29.5, 1.6 ],
                [ "scroll to find more pictures to colour in", 31.5, 2.7 ],
                [ "take a photo of something", 34.5, 3.1 ],
                [ "praise fantastic", 38.0, 1.2 ],
                [ "praise i love it", 39.5, 1.0 ],
                [ "praise thats great", 41.0, 1.2 ],
                [ "praise well done", 42.5, 1.0 ],
                [ "praise wow great picture", 44.0, 2.2 ],
                [ "colour in by selecting a paint", 46.5, 2.7 ],
                [ "have you finished", 49.5, 1.2 ]
            ]

        },

        "tools": {

            "files": [ "audio/tools.mp3", "audio/tools.m4a", "audio/tools.ogg" ],
            "markers": [

                [ "crayon", 0, 0.7 ],
                [ "eraser", 1.0, 0.8 ],
                [ "paintbrush", 3.5, 0.9 ],
                [ "pen", 5.0, 0.4 ],
                [ "pencil", 6.0, 0.7 ],
                [ "stickers", 8.0, 1.1 ],
                [ "glitter", 9.5, 0.9 ],
                [ "shoes", 11.0, 1.5 ],

                [ "fantastic", 13.0, 1.3 ],
                [ "lookhowitglitters", 15.0, 2.8 ],
                [ "iloveit", 18.0, 1.0 ],
                [ "watchthemgo", 19.5, 1.1 ],
                [ "thatsgreat", 21.0, 1.2 ],
                [ "welldone", 22.5, 1.0 ],
                [ "greatpicture", 24.0, 2.3 ]

            ]

        }
    }

};

