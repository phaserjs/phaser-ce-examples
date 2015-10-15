function IDEPause()
{
    if (game)
    {
        game.paused = (game.paused) ? false : true;
    }
}

function IDEMute()
{
    if (game)
    {
        game.sound.mute = (game.sound.mute) ? false : true;
    }
}

function IDEScreenGrab()
{
    if (game)
    {
        if (game.renderType === Phaser.CANVAS)
        {
            game.canvas.toBlob(function(blob) {
                saveAs(blob, "phaser-grab.png");
            });
        }
        else
        {
            console.warn("Screen Grabbing currently only works on Canvas based games, sorry");
        }
    }
}

function IDECallback(event)
{
    if (event.origin === "http://phaser.dev" || event.origin === "http://phaser.io" || event.origin === "http://dev.phaser.io")
    {
        if (event.data === 'pause')
        {
            IDEPause();
        }
        else if (event.data === 'mute')
        {
            IDEMute();
        }
        else if (event.data === 'grab')
        {
            IDEScreenGrab();
        }
        else if (event.data === 'reload')
        {
            //  Otherwise it fires a shutdown event when the page reloads
            window.onbeforeunload = function() {};
            window.location.reload();
        }
        else if (event.data === 'reload2')
        {
            //  Otherwise it fires a shutdown event when the page reloads
            window.onbeforeunload = function() {};
            window.location.href = 'getcode.php?v=' + VERSION;
        }
        else
        {
            //  Run the code
            eval(event.data);
        }
    }
}

if (window.addEventListener)
{
    addEventListener("message", IDECallback, false);
}
else
{
    attachEvent("onmessage", IDECallback);
}

$(document).ready(function() {

    var isEmbed = window != window.parent; 

    if (isEmbed)
    {
        if (IDE_HOOK)
        {
            window.top.postMessage('getCode', 'http://phaser.dev');
        }
    }
    else
    {
        if (IDE_HOOK)
        {
            window.opener.postMessage('getCode', 'http://phaser.dev');
        }

        window.onbeforeunload = function() {
            window.opener.postMessage('shutdown', 'http://phaser.dev');
        }
    }

});
