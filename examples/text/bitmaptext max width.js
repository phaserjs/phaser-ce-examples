
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.bitmapFont('gem', 'assets/fonts/bitmapFonts/gem.png', 'assets/fonts/bitmapFonts/gem.xml');

}

var bpmText;
var text = "Lorem ipsum ";
var words = [ 
    'dolor', 'sit', 'amet', 'consectetuer', 'adipiscing', 'elit', 'aenean', 
    'commodo', 'ligula', 'eget', 'massa', 'sociis', 'natoque', 'penatibus',
    'et', 'magnis', 'dis', 'parturient', 'montes' ];
var run = 5;
var current = 2;

// var text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quid ergo aliud intellegetur nisi uti ne quae pars naturae neglegatur? Si longus, levis; Ita relinquet duas, de quibus etiam atque etiam consideret. Optime, inquam. Sed quanta sit alias, nunc tantum possitne esse tanta.\n\nQuid, si etiam iucunda memoria est praeteritorum malorum? Consequatur summas voluptates non modo parvo, sed per me nihilo, si potest; Atque his de rebus et splendida est eorum et illustris oratio. Mihi enim satis est, ipsis non satis. Ergo ita: non posse honeste vivi, nisi honeste vivatur? Mihi quidem Antiochum, quem audis, satis belle videris attendere. Et quod est munus, quod opus sapientiae? Ex rebus enim timiditas, non ex vocabulis nascitur. Ex ea difficultate illae fallaciloquae, ut ait Accius, malitiae natae sunt. Nonne videmus quanta perturbatio rerum omnium consequatur, quanta confusio? Quae cum magnifice primo dici viderentur, considerata minus probabantur.";
// var text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quid ergo aliud intellegetur nisi uti ne quae pars naturae neglegatur? Si longus, levis; Ita relinquet duas, de quibus etiam atque etiam consideret. Optime, inquam. Sed quanta sit alias, nunc tantum possitne esse tanta.\n\nQuid, si etiam iucunda memoria est praeteritorum malorum?";

function create() {

    game.stage.backgroundColor = 0x272822;

    bmpText = game.add.bitmapText(32, 32, 'gem', text, 16);
    // bmpText = game.add.bitmapText(32, 32, 'gem', text, 32);

    //  Any one line in the bitmap text won't be longer than 400 pixels.
    //  The exception to this rule is if the text has no spaces.
    //  It line-wraps on spaces and word length.
    bmpText.maxWidth = 400;

    //  A visual marker to show where 400px width is
    var marker = game.add.graphics(432, 0);
    marker.beginFill(0xa6e22e);
    marker.drawRect(0, 0, 1, game.height);
    marker.endFill();

    //  Write out 200 random words
    game.time.events.repeat(100, 200, addText, this);

}

function addText() {

    var word = game.rnd.pick(words);

    if (current === 0)
    {
        //  Upper-case the first character of a new sentence
        word = word[0].toUpperCase() + word.slice(1);
    }

    text += word;

    current++;

    if (current === run)
    {
        text += ". ";
        run = game.rnd.between(3, 6);
        current = 0;
    }
    else
    {
        text += " ";
    }

    bmpText.text = text;

}
