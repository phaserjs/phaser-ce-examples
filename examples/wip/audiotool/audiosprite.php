<?php
    $output = Array();

    $raw = 'Paste AudioSprite json in here';

    $output = "\"audio\": [\n";

/*
        "colours": [

            [ "black", 0, 0.6 ],
            [ "blue", 2.0, 0.6 ],
            [ "green", 3.0, 0.7 ],
            [ "orange", 4.0, 0.7 ],
            [ "purple", 5.0, 0.7 ],
            [ "red", 6.0, 0.7 ],
            [ "white", 7.0, 0.7 ],
            [ "yellow", 8.0, 0.7 ],
            [ "gold", 9.0, 0.6 ],
            [ "silver", 10.0, 0.6 ]

    "green": {
      "start": 13,
      "end": 16.68326530612245,


 */

    if (isset($_POST['json']))
    {
        $sprite = json_decode($_POST['json']);

        foreach ($sprite->spritemap as $file => $data)
        {
            $start = $data->start;
            $duration = round($data->end - $start, 2);

            $output .= "\t[ \"$file\", $start, $duration ],\n";
        }
    }

    $output .= "\n];";
?>
<!doctype html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>phaser - AudioSprite JSON Convertor</title>
        <style>
            body {
                font-family: Arial;
                font-size: 14px;
            }
        </style>
    </head>
    <body>

        <h1>AudioSprite JSON Convertor</h1>

        <form action="audiosprite.php" method="post">

        <h2>Input</h2>
        <textarea name="json" style="width: 800px; height: 200px" spellcheck="false"><?php echo $raw ?></textarea>

        <h2>Output</h2>
        <textarea style="width: 800px; height: 400px" spellcheck="false"><?php echo $output ?></textarea>

        <br />

        <input type="submit" value="Convert" />

        </form>

    </body>
</html>