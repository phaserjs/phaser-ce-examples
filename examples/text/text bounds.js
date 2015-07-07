
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, render: render });

var text;
var ipsum = "Click to change alignment\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Quid ergo aliud intellegetur nisi uti ne quae pars naturae neglegatur?\n\nSi longus, levis; Ita relinquet duas, de quibus etiam atque etiam consideret. Optime, inquam. Sed quanta sit alias, nunc tantum possitne esse tanta.\n\nQuid, si etiam iucunda memoria est praeteritorum malorum?";

//  The different types of alignment this demo cycles through
//  h = horizontal, v = vertical
//  a = the text alignment (see comments below)
var align = [ 
    { h: 'left', v: 'top', a: 'left' },
    { h: 'center', v: 'top', a: 'center' },
    { h: 'right', v: 'top', a: 'right' },
    { h: 'left', v: 'middle', a: 'left' },
    { h: 'center', v: 'middle', a: 'center' },
    { h: 'right', v: 'middle', a: 'right' },
    { h: 'left', v: 'bottom', a: 'left' },
    { h: 'center', v: 'bottom', a: 'center' },
    { h: 'right', v: 'bottom', a: 'right' }
];

var i = 0;

function preload() {

    game.load.image('bg', 'assets/skies/deepblue.png');

}

function create() {

    game.add.image(0, 0, 'bg');

    var style = { font: "16px Arial", fill: "#fff", 
        align: "left", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
        boundsAlignH: "left", 
        boundsAlignV: "top", 
        wordWrap: true, wordWrapWidth: 300 };

    text = game.add.text(0, 0, ipsum, style);

    text.setTextBounds(16, 16, 768, 568);

    game.input.onDown.add(changeAlign, this);

}

function changeAlign() {

    i++;

    if (i === align.length)
    {
        i = 0;
    }

    //  Un-comment this line to keep the text left-aligned
    text.align = align[i].a;

    text.boundsAlignH = align[i].h;
    text.boundsAlignV = align[i].v;

}

function render() {

    //  Un-comment to see the text bounds rect to which the text is aligned
    // game.debug.geom(text.textBounds, 'rgba(255,0,0,0.5)');

}