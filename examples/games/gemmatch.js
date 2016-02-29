// Example by https://twitter.com/awapblog

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

var GEM_SIZE = 64;
var GEM_SPACING = 2;
var GEM_SIZE_SPACED = GEM_SIZE + GEM_SPACING;
var BOARD_COLS;
var BOARD_ROWS;
var MATCH_MIN = 3; // min number of same color gems required in a row to be considered a match

var gems;
var selectedGem = null;
var selectedGemStartPos;
var selectedGemTween;
var tempShiftedGem = null;
var allowInput;

function preload() {

    game.load.spritesheet("GEMS", "assets/sprites/diamonds32x5.png", GEM_SIZE, GEM_SIZE);

}

function create() {

    // fill the screen with as many gems as possible
    spawnBoard();

    // currently selected gem starting position. used to stop player form moving gems too far.
    selectedGemStartPos = { x: 0, y: 0 };
    
    // used to disable input while gems are dropping down and respawning
    allowInput = true;

    game.input.addMoveCallback(slideGem, this);

}

function releaseGem() {

    if (tempShiftedGem === null) {
        selectedGem = null;
        return;
    }

    // when the mouse is released with a gem selected
    // 1) check for matches
    // 2) remove matched gems
    // 3) drop down gems above removed gems
    // 4) refill the board

    checkAndKillGemMatches();

    removeKilledGems();

    var dropGemDuration = dropGems();

    // delay board refilling until all existing gems have dropped down
    game.time.events.add(dropGemDuration * 100, refillBoard);

    allowInput = false;

    selectedGem = null;
    tempShiftedGem = null;

}

function slideGem(pointer, x, y) {

    // check if a selected gem should be moved and do it

    if (selectedGem && pointer.isDown)
    {
        var cursorGemPosX = getGemPos(x);
        var cursorGemPosY = getGemPos(y);

        if (checkIfGemCanBeMovedHere(selectedGemStartPos.x, selectedGemStartPos.y, cursorGemPosX, cursorGemPosY))
        {
            if (cursorGemPosX !== selectedGem.posX || cursorGemPosY !== selectedGem.posY)
            {
                // move currently selected gem
                if (selectedGemTween !== null)
                {
                    game.tweens.remove(selectedGemTween);
                }

                selectedGemTween = tweenGemPos(selectedGem, cursorGemPosX, cursorGemPosY);

                gems.bringToTop(selectedGem);

                // if we moved a gem to make way for the selected gem earlier, move it back into its starting position
                if (tempShiftedGem !== null)
                {
                    tweenGemPos(tempShiftedGem, selectedGem.posX , selectedGem.posY);
                    swapGemPosition(selectedGem, tempShiftedGem);
                }

                // when the player moves the selected gem, we need to swap the position of the selected gem with the gem currently in that position 
                tempShiftedGem = getGem(cursorGemPosX, cursorGemPosY);

                if (tempShiftedGem === selectedGem)
                {
                    tempShiftedGem = null;
                }
                else
                {
                    tweenGemPos(tempShiftedGem, selectedGem.posX, selectedGem.posY);
                    swapGemPosition(selectedGem, tempShiftedGem);
                }
            }
        }
    }
}

// fill the screen with as many gems as possible
function spawnBoard() {

    BOARD_COLS = Math.floor(game.world.width / GEM_SIZE_SPACED);
    BOARD_ROWS = Math.floor(game.world.height / GEM_SIZE_SPACED);

    gems = game.add.group();

    for (var i = 0; i < BOARD_COLS; i++)
    {
        for (var j = 0; j < BOARD_ROWS; j++)
        {
            var gem = gems.create(i * GEM_SIZE_SPACED, j * GEM_SIZE_SPACED, "GEMS");
            gem.name = 'gem' + i.toString() + 'x' + j.toString();
            gem.inputEnabled = true;
            gem.events.onInputDown.add(selectGem, this);
            gem.events.onInputUp.add(releaseGem, this);
            randomizeGemColor(gem);
            setGemPos(gem, i, j); // each gem has a position on the board
        }
    }

}

// select a gem and remember its starting position
function selectGem(gem) {

    if (allowInput)
    {
        selectedGem = gem;
        selectedGemStartPos.x = gem.posX;
        selectedGemStartPos.y = gem.posY;
    }

}

// find a gem on the board according to its position on the board
function getGem(posX, posY) {

    return gems.iterate("id", calcGemId(posX, posY), Phaser.Group.RETURN_CHILD);

}

// convert world coordinates to board position
function getGemPos(coordinate) {

    return Math.floor(coordinate / GEM_SIZE_SPACED);

}

// set the position on the board for a gem
function setGemPos(gem, posX, posY) {

    gem.posX = posX;
    gem.posY = posY;
    gem.id = calcGemId(posX, posY);

}

// the gem id is used by getGem() to find specific gems in the group
// each position on the board has a unique id
function calcGemId(posX, posY) {

    return posX + posY * BOARD_COLS;

}

// since the gems are a spritesheet, their color is the same as the current frame number
function getGemColor(gem) {

    return gem.frame;

}

// set the gem spritesheet to a random frame
function randomizeGemColor(gem) {

    gem.frame = game.rnd.integerInRange(0, gem.animations.frameTotal - 1);

}

// gems can only be moved 1 square up/down or left/right
function checkIfGemCanBeMovedHere(fromPosX, fromPosY, toPosX, toPosY) {

    if (toPosX < 0 || toPosX >= BOARD_COLS || toPosY < 0 || toPosY >= BOARD_ROWS)
    {
        return false;
    }

    if (fromPosX === toPosX && fromPosY >= toPosY - 1 && fromPosY <= toPosY + 1)
    {
        return true;
    }

    if (fromPosY === toPosY && fromPosX >= toPosX - 1 && fromPosX <= toPosX + 1)
    {
        return true;
    }

    return false;
}

// count how many gems of the same color lie in a given direction
// eg if moveX=1 and moveY=0, it will count how many gems of the same color lie to the right of the gem
// stops counting as soon as a gem of a different color or the board end is encountered
function countSameColorGems(startGem, moveX, moveY) {

    var curX = startGem.posX + moveX;
    var curY = startGem.posY + moveY;
    var count = 0;

    while (curX >= 0 && curY >= 0 && curX < BOARD_COLS && curY < BOARD_ROWS && getGemColor(getGem(curX, curY)) === getGemColor(startGem))
    {
        count++;
        curX += moveX;
        curY += moveY;
    }

    return count;

}

// swap the position of 2 gems when the player drags the selected gem into a new location
function swapGemPosition(gem1, gem2) {

    var tempPosX = gem1.posX;
    var tempPosY = gem1.posY;
    setGemPos(gem1, gem2.posX, gem2.posY);
    setGemPos(gem2, tempPosX, tempPosY);

}

// count how many gems of the same color are above, below, to the left and right
// if there are more than 3 matched horizontally or vertically, kill those gems
// if no match was made, move the gems back into their starting positions
function checkAndKillGemMatches() {

    if (selectedGem === null) { return; }

    if (tempShiftedGem === null ) { return; }

    var canKill = false;

    // process the selected gem

    var countUp = countSameColorGems(selectedGem, 0, -1);
    var countDown = countSameColorGems(selectedGem, 0, 1);
    var countLeft = countSameColorGems(selectedGem, -1, 0);
    var countRight = countSameColorGems(selectedGem, 1, 0);

    var countHoriz = countLeft + countRight + 1;
    var countVert = countUp + countDown + 1;

    if (countVert >= MATCH_MIN)
    {
        killGemRange(selectedGem.posX, selectedGem.posY - countUp, selectedGem.posX, selectedGem.posY + countDown);
        canKill = true;
    }

    if (countHoriz >= MATCH_MIN)
    {
        killGemRange(selectedGem.posX - countLeft, selectedGem.posY, selectedGem.posX + countRight, selectedGem.posY);
        canKill = true;
    }

    // now process the shifted (swapped) gem

    countUp = countSameColorGems(tempShiftedGem, 0, -1);
    countDown = countSameColorGems(tempShiftedGem, 0, 1);
    countLeft = countSameColorGems(tempShiftedGem, -1, 0);
    countRight = countSameColorGems(tempShiftedGem, 1, 0);

    countHoriz = countLeft + countRight + 1;
    countVert = countUp + countDown + 1;

    if (countVert >= MATCH_MIN)
    {
        killGemRange(tempShiftedGem.posX, tempShiftedGem.posY - countUp, tempShiftedGem.posX, tempShiftedGem.posY + countDown);
        canKill = true;
    }

    if (countHoriz >= MATCH_MIN)
    {
        killGemRange(tempShiftedGem.posX - countLeft, tempShiftedGem.posY, tempShiftedGem.posX + countRight, tempShiftedGem.posY);
        canKill = true;
    }

    if (! canKill) // there are no matches so swap the gems back to the original positions
    {
        var gem = selectedGem;

        if (gem.posX !== selectedGemStartPos.x || gem.posY !== selectedGemStartPos.y)
        {
            if (selectedGemTween !== null)
            {
                game.tweens.remove(selectedGemTween);
            }

            selectedGemTween = tweenGemPos(gem, selectedGemStartPos.x, selectedGemStartPos.y);

            if (tempShiftedGem !== null)
            {
                tweenGemPos(tempShiftedGem, gem.posX, gem.posY);
            }

            swapGemPosition(gem, tempShiftedGem);

            tempShiftedGem = null;

        }
    }

}

// kill all gems from a starting position to an end position
function killGemRange(fromX, fromY, toX, toY) {

    fromX = Phaser.Math.clamp(fromX, 0, BOARD_COLS - 1);
    fromY = Phaser.Math.clamp(fromY , 0, BOARD_ROWS - 1);
    toX = Phaser.Math.clamp(toX, 0, BOARD_COLS - 1);
    toY = Phaser.Math.clamp(toY, 0, BOARD_ROWS - 1);

    for (var i = fromX; i <= toX; i++)
    {
        for (var j = fromY; j <= toY; j++)
        {
            var gem = getGem(i, j);
            gem.kill();
        }
    }

}

// move gems that have been killed off the board
function removeKilledGems() {

    gems.forEach(function(gem) {
        if (!gem.alive) {
            setGemPos(gem, -1,-1);
        }
    });

}

// animated gem movement
function tweenGemPos(gem, newPosX, newPosY, durationMultiplier) {

    console.log('Tween ',gem.name,' from ',gem.posX, ',', gem.posY, ' to ', newPosX, ',', newPosY);
    if (durationMultiplier === null || typeof durationMultiplier === 'undefined')
    {
        durationMultiplier = 1;
    }

    return game.add.tween(gem).to({x: newPosX  * GEM_SIZE_SPACED, y: newPosY * GEM_SIZE_SPACED}, 100 * durationMultiplier, Phaser.Easing.Linear.None, true);

}

// look for gems with empty space beneath them and move them down
function dropGems() {

    var dropRowCountMax = 0;

    for (var i = 0; i < BOARD_COLS; i++)
    {
        var dropRowCount = 0;

        for (var j = BOARD_ROWS - 1; j >= 0; j--)
        {
            var gem = getGem(i, j);

            if (gem === null)
            {
                dropRowCount++;
            }
            else if (dropRowCount > 0)
            {
                setGemPos(gem, gem.posX, gem.posY + dropRowCount);
                tweenGemPos(gem, gem.posX, gem.posY, dropRowCount);
            }
        }

        dropRowCountMax = Math.max(dropRowCount, dropRowCountMax);
    }

    return dropRowCountMax;

}

// look for any empty spots on the board and spawn new gems in their place that fall down from above
function refillBoard() {

    var maxGemsMissingFromCol = 0;

    for (var i = 0; i < BOARD_COLS; i++)
    {
        var gemsMissingFromCol = 0;

        for (var j = BOARD_ROWS - 1; j >= 0; j--)
        {
            var gem = getGem(i, j);

            if (gem === null)
            {
                gemsMissingFromCol++;
                gem = gems.getFirstDead();
                gem.reset(i * GEM_SIZE_SPACED, -gemsMissingFromCol * GEM_SIZE_SPACED);
                randomizeGemColor(gem);
                setGemPos(gem, i, j);
                tweenGemPos(gem, gem.posX, gem.posY, gemsMissingFromCol * 2);
            }
        }

        maxGemsMissingFromCol = Math.max(maxGemsMissingFromCol, gemsMissingFromCol);
    }

    game.time.events.add(maxGemsMissingFromCol * 2 * 100, boardRefilled);

}

// when the board has finished refilling, re-enable player input
function boardRefilled() {

    allowInput = true;

}
