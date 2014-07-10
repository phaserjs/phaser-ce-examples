var MainState = {

    preload: function() {

        this.load.image('box', 'assets/sprites/block.png');

    },
  
    create: function() {

        for (var x = 0; x < 12; x++)
        {
            for (var y = 0; y < 8; y++)
            {
                var sprite = game.add.sprite(x * 64, y * 64, 'box');

                sprite.name = 'block' + x + '-' + y;

                sprite.tint = Math.random() * 0xFFFFFF;

                sprite.inputEnabled = true;

                sprite.events.onInputDown.add(icon_click, this);
                sprite.events.onInputOver.add(icon_over, this);
                sprite.events.onInputOut.add(icon_out, this);
            }
        }
    }

};
  
function icon_click(sprite, pointer) { 

    console.log('clicked', sprite.name);
    sprite.tint = Math.random() * 0xFFFFFF;

}

function icon_over(sprite, pointer) {        

    sprite.bringToTop();

}

function icon_out(sprite, pointer) { 
}


var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', MainState);