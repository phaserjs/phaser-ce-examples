<?php
    $v = "2.3.0";

    // ensure the requested file is not attempting to do directory traversal
    if (isset($_GET['f']))
    {
        $safe_path = preg_replace('{/$}', '', dirname(__FILE__));
        $requested_path = realpath($safe_path . $_GET['f']);

        if (strlen($requested_path) && substr($requested_path, 0, strlen($safe_path)) != $safe_path)
        {
            die();
        }
    }

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
                margin: 0;
                padding: 0;
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

        var IDE_HOOK = false;

        <?php
            if (isset($_GET['f']))
            {
                $src = file_get_contents($_GET['f']);
                echo $src;
            }
        ?>
        
        </script>

    </body>
</html>
