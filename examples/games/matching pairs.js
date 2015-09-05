// mods by Patrick OReilly 
// twitter: @pato_reilly

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.tilemap('matching', 'assets/tilemaps/maps/phaser_tiles.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/tilemaps/tiles/phaser_tiles.png');//, 100, 100, -1, 1, 1);    
}

var timeCheck = 0;
var flipFlag = false;

var startList = [];
var squareList = [];

var masterCounter = 0;
var squareCounter = 0;
var square1Num;
var square2Num;
var savedSquareX1;
var savedSquareY1;
var savedSquareX2;
var savedSquareY2;

var map;
var tileset;
var layer;

var marker;
var currentTile;
var currentTilePosition;

var myCountdownSeconds;
var currentNum;

var tileBack = 25;
var timesUp = '+';
var youWin = '+';

function create() {

        map = game.add.tilemap('matching');

        map.addTilesetImage('Desert', 'tiles');

        //tileset = game.add.tileset('tiles');
    
        layer = map.createLayer('Ground');//.tilemapLayer(0, 0, 600, 600, tileset, map, 0);

        //layer.resizeWorld();

        marker = game.add.graphics();
        marker.lineStyle(2, 0x00FF00, 1);
        marker.drawRect(0, 0, 100, 100);
    
    randomizeTiles();

}

function update() {
    
    countDownTimer();
    
    if (layer.getTileX(game.input.activePointer.worldX) <= 5) // to prevent the marker from going out of bounds
    {
        marker.x = layer.getTileX(game.input.activePointer.worldX) * 100;
        marker.y = layer.getTileY(game.input.activePointer.worldY) * 100;
    }

    if (flipFlag) 
    {
        if (game.time.totalElapsedSeconds() - timeCheck > 0.5)
        {
            flipBack();
        }
    }
    else
    {
        processClick();
    }
}
   
   
function countDownTimer() {
  
    var timeLimit = 120;
  
    var mySeconds = game.time.totalElapsedSeconds();
    myCountdownSeconds = timeLimit - mySeconds;
    
    if (myCountdownSeconds <= 0) 
        {
        // time is up
        timesUp = 'Time is up!';    
    }
}

function processClick() {
   
    currentTile = map.getTile(layer.getTileX(marker.x), layer.getTileY(marker.y));
    currentTilePosition = ((layer.getTileY(game.input.activePointer.worldY)+1)*6)-(6-(layer.getTileX(game.input.activePointer.worldX)+1));
        
    if (game.input.mousePointer.isDown)
        {
        // check to make sure the tile is not already flipped
        if (currentTile.index == tileBack)
        {
            // get the corresponding item out of squareList
            var currentNum = squareList[currentTilePosition-1];
            flipOver();
            squareCounter++;
            // is the second tile of pair flipped?
            if  (squareCounter == 2) 
            {
                // reset squareCounter
                squareCounter = 0;
                square2Num = currentNum;
                // check for match
                if (square1Num == square2Num)
                {
                    masterCounter++;    
                    
                    if (masterCounter == 18) 
                    {
                        // go "win"
                        youWin = 'Got them all!';
                    }                       
                }
                else
                {
                    savedSquareX2 = layer.getTileX(marker.x);
                    savedSquareY2 = layer.getTileY(marker.y);
                        flipFlag = true;
                        timeCheck = game.time.totalElapsedSeconds();
                }   
            }   
            else
            {
                savedSquareX1 = layer.getTileX(marker.x);
                savedSquareY1 = layer.getTileY(marker.y);
                    square1Num = currentNum;
            }           
        }           
    }    
}
 
function flipOver() {
 
    map.putTile(currentNum, layer.getTileX(marker.x), layer.getTileY(marker.y));
}
 
function flipBack() {
        
    flipFlag = false;
    
    map.putTile(tileBack, savedSquareX1, savedSquareY1);
    map.putTile(tileBack, savedSquareX2, savedSquareY2);
 
}
 
function randomizeTiles() {

    var num;
    for (num = 1; num <= 18; num++)
    {
        startList.push(num);
    }
    for (num = 1; num <= 18; num++)
    {
        startList.push(num);
    }
  
    // randomize squareList
    var i;
    for (i = 1; i <=36; i++)
    {
        var randomPosition = game.rnd.integerInRange(0,startList.length - 1);

        var thisNumber = startList[ randomPosition ];

        squareList.push(thisNumber);
        var a = startList.indexOf(thisNumber);

        startList.splice( a, 1);
    }
      
    var col, row;
    for (col = 0; col < 6; col++)
    {
        for (row = 0; row < 6; row++)
        {
            map.putTile(tileBack, col, row);
        }
    }
}

function getHiddenTile() {
        
    var thisTile = squareList[currentTilePosition-1];
    return thisTile;

}

function render() {

    game.debug.text(timesUp, 620, 208, 'rgb(0,255,0)');
    game.debug.text(youWin, 620, 240, 'rgb(0,255,0)');

    game.debug.text('Time: ' + myCountdownSeconds, 620, 15, 'rgb(0,255,0)');

    //game.debug.text('squareCounter: ' + squareCounter, 620, 272, 'rgb(0,0,255)');
    game.debug.text('Matched Pairs: ' + masterCounter, 620, 304, 'rgb(0,0,255)');

    //game.debug.text('startList: ' + myString1, 620, 208, 'rgb(255,0,0)');
    //game.debug.text('squareList: ' + myString2, 620, 240, 'rgb(255,0,0)');


    game.debug.text('Tile: ' + map.getTile(layer.getTileX(marker.x), layer.getTileY(marker.y)).index, 620, 48, 'rgb(255,0,0)');

    game.debug.text('LayerX: ' + layer.getTileX(marker.x), 620, 80, 'rgb(255,0,0)');
    game.debug.text('LayerY: ' + layer.getTileY(marker.y), 620, 112, 'rgb(255,0,0)');

    game.debug.text('Tile Position: ' + currentTilePosition, 620, 144, 'rgb(255,0,0)');
    game.debug.text('Hidden Tile: ' + getHiddenTile(), 620, 176, 'rgb(255,0,0)');
}
