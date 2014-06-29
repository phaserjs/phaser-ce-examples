<!doctype html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>phaser</title>
        <meta name="viewport" content="initial-scale=1 maximum-scale=1 user-scalable=0 minimal-ui" />
        <?php
            $path = '../../phaser';
            require('../../phaser/build/config.php');
        ?>
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