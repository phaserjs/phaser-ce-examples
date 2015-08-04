var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example');

var BasicGame = function(game) {};

BasicGame.Boot = function (game) {
    // nothing here
};

BasicGame.Boot.prototype = 
{
    preload: function() {
        game.load.baseURL = 'http://examples.phaser.io/assets/';
        game.load.crossOrigin = 'anonymous';

        game.load.image('phaser', 'sprites/phaser-dude.png');
    },
    create: function() 
    {
        var sprite1 = game.add.sprite(20, 100, 'phaser');
        sprite1.inputEnabled = true;
        var sprite2 = game.add.sprite(100, 100, 'phaser');
        sprite2.inputEnabled = true;
        sprite1.name = 'sprite 1';
        sprite2.name = 'sprite 2';
        sprite1.selected = false;
        sprite2.selected = false;
        sprite1.justSelected = false;
        sprite2.justSelected = false;
        sprite1.dragging = false;
        sprite2.dragging = false;
        game.currentSelection = null;
        sprite1.events.onInputDown.add(onMouseDown, sprite1);
        sprite2.events.onInputDown.add(onMouseDown, sprite2);
        sprite1.events.onInputUp.add(onMouseUp, sprite1);
        sprite2.events.onInputUp.add(onMouseUp, sprite2);
        game.input.addMoveCallback(onMouseMove, sprite1);        
        game.input.addMoveCallback(onMouseMove, sprite2);        
        sprite1.update = function() {
            if (this.selected) {
                this.tint = 0x8080FF;
            } else {
                this.tint = 0xFFFFFF;
            }
        }

        sprite2.update = function() {
            if (this.selected) {
                this.tint = 0xFF8000;
            } else {
                this.tint = 0xFFFFFF;
            }
        }        
    },
    update: function() 
    {

    }, 
    render: function()
    {
        game.debug.text('selected: sprite1 ' + game.world.children[0].selected, 2, 14, "#00ff00");
        game.debug.text('selected: sprite2 ' + game.world.children[1].selected, 2, 30, "#00ff00");
        game.debug.text(Phaser.VERSION, game.world.width - 100, 14, "#ffff00");
        //game.debug.pointer(game.input.activePointer);
    }
};



onMouseDown = function(object, pointer) {
 
    console.log('mouseDown ' + this.name);
    if (this.game.currentSelection && this.game.currentSelection != this) {
        this.game.currentSelection.selected = false;
    }
    this.selected = true;
    this.game.currentSelection = this;
    this.justSelected = true;
    this.dragging = true;
}

onMouseUp = function(object, pointer) {
 
    console.log('mouseUp ' + this.name);
  //  if (this.selected && !this.dragging && !this.justSelected) {
       this.selected = false;
       this.game.currentSelection = null;
   // }
    if (pointer.leftButton.isUp) {
        this.dragging = false;
        this.justSelected = false;
    }
    
    
}
onMouseMove = function(pointer) {
 
    if (this.selected && pointer.leftButton.isDown && this.dragging) {
        console.log('clicking and dragging while ' + this.name + ' is selected');
        this.x = pointer.x;
        this.y = pointer.y;
    }    
}

game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');