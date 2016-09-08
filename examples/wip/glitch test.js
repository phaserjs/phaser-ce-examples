
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('picture1', 'assets/pics/cougar_sanity_train.png');
    game.load.image('picture2', 'assets/pics/cougar-face_of_nature.png');
    game.load.image('picture3', 'assets/pics/destop-rewarding.png');
    game.load.image('picture4', 'assets/pics/unknown-the_starwars_pic.png');

}

function create() {

    var pic1 = game.add.sprite(0, 200, 'picture1');
    var pic2 = game.add.sprite(200, 200, 'picture2');
    var pic3 = game.add.sprite(400, 200, 'picture3');
    var pic4 = game.add.sprite(600, 200, 'picture4');

    var pics = [ pic1, pic2, pic3, pic4 ];

    var i = 0;

    pics.forEach(function(pic) {

        pic.scale.set(0.5);
        pic.visible = false;

        game.time.events.add(1000 + (i * 500), this.showPicture, this, pic);
        i++;

    });

}

function showPicture(pic) {

    if (pic.y === 200)
    {
        pic.y = 400;
    }
    else
    {
        pic.y = 200;
    }

    pic.visible = true;

    game.time.events.add(2000, this.removePicture, this, pic);

}

function removePicture(pic) {

    pic.visible = false;

    game.time.events.add(2000, this.showPicture, this, pic);

}
