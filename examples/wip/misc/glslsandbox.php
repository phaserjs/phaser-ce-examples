<?php
    function getTabs() {
        
        global $tabs;

        $s = "";

        for ($t = 0; $t < $tabs; $t++)
        {
            $s = $s . "\t";
        }

        return $s;

    }

    $pixi = Array();

    $raw = 'Paste GLSL Sandbox code in here';

    $output = "var fragmentSrc = [\n";
    $output .= "\t\"precision mediump float;\",\n";
    $output .= "\t\"uniform float     time;\",\n";
    $output .= "\t\"uniform vec2      resolution;\",\n";
    $output .= "\t\"uniform vec2      mouse;\",\n";
    $output .= "\t\"uniform vec4      date;\",\n";
    $output .= "\t\"uniform sampler2D iChannel0;\",\n";
    $output .= "\t\"// add any extra uniforms here\",\n";
    $output .= "\n";

    $tabs = 1;

    if (isset($_POST['shader']))
    {
        $shader = explode("\n", $_POST['shader']);
        $raw = $_POST['shader'];

        for ($i = 0; $i < count($shader); $i++)
        {
            $pixi[] = trim($shader[$i]);
        }

        //  Tabbing
        for ($i = 0; $i < count($pixi); $i++)
        {
            $pixi[$i] = trim($pixi[$i]);
            $pixi[$i] = str_replace('"', '', $pixi[$i]);

            if ($pixi[$i] === '')
            {
                $output = $output . "\n";
            }
            else
            {
                //  If there is a { and } on the same line, don't change the tabbing
                $open = strpos($pixi[$i], '{');
                $close = strrpos($pixi[$i], '}');

                if ($open !== false && $close !== false && $close > $open)
                {
                    //  We've got a single-liner, so don't change the tabbing
                    $output = $output . getTabs() . '"' . $pixi[$i] . "\",\n";
                }
                else
                {
                    if ($open !== false)
                    {
                        //  We've got an opener, but not a closer, so increase the tabbing after adding to output
                        $output = $output . getTabs() . '"' . $pixi[$i] . "\",\n";
                        $tabs++;
                    }
                    else if ($open === false && $close !== false)
                    {
                        //  We've got a closer, so decrease the tabbing before adding to output
                        $tabs--;

                        if ($tabs < 1)
                        {
                            $tabs = 1;
                        }

                        $output = $output . getTabs() . '"' . $pixi[$i] . "\",\n";
                    }
                    else
                    {
                        //  Don't change anything, just append it
                        $output = $output . getTabs() . '"' . $pixi[$i] . "\",\n";
                    }
                }
            }
        }

        $output = rtrim($output);

        if (substr($output, -1) == ',')
        {
            $output = substr($output, 0, -1);
        }

        if (substr($output, -1) !== '}')
        {
            $output .= "}";
        }
    }

    $output .= "\n];";
?>
<!doctype html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>phaser - GLSL Sandbox Convertor</title>
        <style>
            body {
                font-family: Arial;
                font-size: 14px;
            }
        </style>
    </head>
    <body>

        <h1>GLSL Sandbox to PIXI Convertor</h1>

        <form action="glslsandbox.php" method="post">

        <h2>Input</h2>
        <textarea name="shader" style="width: 800px; height: 200px" spellcheck="false"><?php echo $raw ?></textarea>

        <h2>Output</h2>
        <textarea style="width: 800px; height: 400px" spellcheck="false"><?php echo $output ?></textarea>

        <br />

        <input type="submit" value="Convert" />

        </form>

    </body>
</html>