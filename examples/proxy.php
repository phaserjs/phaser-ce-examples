<?php
    if (isset($_GET['a']) && $_GET['a'] === 'refresh')
    {
        header("Location: proxy.php?a=load");
        exit();
    }
?>
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
                background: #000;
                color: #fff;
            }
        </style>
    </head>
    <body>

        <div id="phaser-example"></div>

        <script type="text/javascript">
        function editorCallback(event)
        {
            if (event.origin === "http://localhost")
            {
                eval(event.data);
            }
        }

        if (window.addEventListener)
        {
            addEventListener("message", editorCallback, false);
        }
        else
        {
            attachEvent("onmessage", editorCallback);
        }

        <?php
            if (isset($_GET['a']) && $_GET['a'] === 'load')
            {
        ?>
        
        var i = window.top;
        i.postMessage('getCode', "http://localhost");
        
        <?php
            }
        ?>
        </script>

    </body>
</html>