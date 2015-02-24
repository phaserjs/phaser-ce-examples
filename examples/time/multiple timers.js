
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('picture1', 'assets/pics/cougar_sanity_train.png');
    game.load.image('picture2', 'assets/pics/cougar-face_of_nature.png');
    game.load.image('picture3', 'assets/pics/destop-rewarding.png');
    game.load.image('picture4', 'assets/pics/destop-unknown.png');
    game.load.image('picture5', 'assets/pics/questar.png');
    game.load.image('picture6', 'assets/pics/seven_seas_andromeda_fairfax.png');
    game.load.image('picture7', 'assets/pics/slayer-sorry_im_the_beast.png');

}

var text;

function create() {

    var pic1 = game.add.sprite(0, 0, 'picture1');
    var pic2 = game.add.sprite(0, 0, 'picture2');
    var pic3 = game.add.sprite(0, 0, 'picture3');
    var pic4 = game.add.sprite(0, 0, 'picture4');
    var pic5 = game.add.sprite(0, 0, 'picture5');
    var pic6 = game.add.sprite(0, 0, 'picture6');
    var pic7 = game.add.sprite(0, 0, 'picture7');

    var pics = [ pic1, pic2, pic3, pic4, pic5, pic6, pic7 ];

    pics.forEach(function(pic) {

        pic.scale.set(0.5);
        pic.visible = false;

        game.time.events.add(0, this.showPicture, this, pic);
    });

    var style = { font: "32px Arial", fill: "#52bace", align: "center" };
    text = game.add.text(game.world.centerX, 64, "Events: " + game.time.events.length, style);
    text.anchor.set(0.5);

}

function update() {

    text.text = "Events: " + game.time.events.length;

}

function showPicture(pic) {

    pic.x = game.rnd.between(0, game.width - pic.width);
    pic.y = game.rnd.between(0, game.height - pic.height);
    pic.visible = true;

    game.time.events.add(2000, this.removePicture, this, pic);

}

function removePicture(pic) {

    pic.visible = false;

    game.time.events.add(2000, this.showPicture, this, pic);

}
