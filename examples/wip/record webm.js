
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create, update: update });

var video;
var sprite;
var recorder;

function create() {

    video = game.add.video(null, false);

    video.onAccess.add(camAllowed, this);
    video.onError.add(camBlocked, this);

}

function camAllowed(video) {

    console.log('--> camera was allowed', video);

    video.play();

    sprite = video.addToWorld();

    // sprite.x = 640;
    // sprite.scale.x = -1;

    recorder = RecordRTC(video.videoStream, { type: 'video' });

    video.onAccess.remove(camAllowed, this);
    video.onError.remove(camBlocked, this);

    console.log(recorder);

    game.input.onDown.addOnce(LocalStartRecording, this);

}

function update() {
}

function LocalStartRecording() {

    console.log('startRecording');

    game.input.onDown.addOnce(LocalStopRecording, this);

    recorder.startRecording();

    // debugger;

    game.time.events.add(2000, LocalStopRecording, this);

    console.log('startRecording');

}

function LocalStopRecording() {

    var fileName = Math.round(Math.random() * 99999999) + 99999999;

    console.log('stopRecording', fileName);
    
    recorder.stopRecording(function() {
        sendRecording(recorder.getBlob(), fileName + '.webm');
    });

}

function sendRecording(blob, fileName) {

    console.log('sendRecording');

    var formData = new FormData();
    formData.append('video-filename', fileName);
    formData.append('video-blob', blob);
    
    // var _this = this;

    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {

        if (request.readyState === 4 && request.status === 200)
        {
            console.log(request.responseText);

            // var result = JSON.parse(request.responseText);
        }

    };

    request.open('POST', "http://192.168.0.100/disney-inside-out/api/Save.php");
    request.send(formData);

}

function camBlocked(video, error) {

    console.log('camera was blocked', video, error);

}

function stopCam() {

    console.log('camera stopped');

    video.stop();

}
