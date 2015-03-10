<?php
    //  Old: http://examples.phaser.io/_site/view_full.html?d=animation&f=animation+events.js&t=animation%20events
    //  New: http://phaser.dev/examples/v2/animation/animation-events

    //  Old: http://examples.phaser.dev/_site/view_full.html?d=basics&f=01+-+load+an+image.js&t=01%20-%20load%20an%20image
    //  New: http://phaser.dev/examples/v2/basics/01-load-an-image

    $directory = '';
    $file = '';

    if (isset($_GET['d']))
    {
        $directory = trim($_GET['d']);
        $directory = str_replace(' ', '-', $directory);
    }

    if (isset($_GET['f']))
    {
        $file = trim($_GET['f']);
        $file = str_replace('.js', '', $file);
        $file = str_replace(' - ', '-', $file);
        $file = str_replace(' ', '-', $file);
    }

    $url = "http://phaser.io/examples/";
    // $url = "http://phaser.dev/examples/";

    //  Directory set, but file isn't
    if ($directory !== '' && $file === '')
    {
        $url .= "v2/category/" . $directory;
    }
    else if ($directory !== '' && $file !== '')
    {
        $url .= "v2/$directory/$file";
    }

    header("Location: $url");
    exit();
?>