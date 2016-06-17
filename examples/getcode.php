<?php
    $v = "2.5.0";

    if (isset($_GET['v']))
    {
        $v = $_GET['v'];
    }

    if ($_SERVER['SERVER_ADDR'] === '192.168.0.100')
    {
        $embedJS = "embed-local.js";
    }
    else
    {
        $embedJS = "embed.js";
    }
?>
<!doctype html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Phaser Example Runner</title>
        <meta name="viewport" content="initial-scale=1 maximum-scale=1 user-scalable=0 minimal-ui" />
        <script src="_site/js/jquery-2.0.3.min.js" type="text/javascript"></script>
        <script src="_site/phaser/phaser.<?php echo $v ?>.min.js" type="text/javascript"></script>
        <script src="_site/phaser/blob.js" type="text/javascript"></script>
        <script src="_site/phaser/canvas-to-blob.js" type="text/javascript"></script>
        <script src="_site/phaser/filesaver.js" type="text/javascript"></script>
        <script src="_site/phaser/<?php echo $embedJS ?>" type="text/javascript"></script>
        <style>
            body {
                margin: 0px;
                padding: 0px;
                font-family: Arial;
                font-size: 14px;
                background-color: #000000;
                color: #fff;
            }
        </style>
    </head>
    <body>
        <div id="phaser-example"></div>

        <script type="text/javascript">

        var IDE_HOOK = true;
        var VERSION = '<?php echo $v ?>';

        </script>

    </body>
</html>