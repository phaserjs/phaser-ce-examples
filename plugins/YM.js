/*------------------------------------------------------------------------------
 Tweaked for Phaser.js framework by Nicolas CHALLEIL Aka STuFF
 (removed all amiga song playback, handle ArrayBuffer)

 Copyright (c) 2011 Antoine Santo Aka NoNameNo

 This File is part of the CODEF project.

 More info : http://codef.santo.fr
 Demo gallery http://www.wab.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ------------------------------------------------------------------------------*/

!(function () {
    var CODEF_AUDIO_CONTEXT = null;
    var CODEF_AUDIO_NODE = null;

    function YM (data) {

        if (typeof window.AudioContext !== 'undefined') {

            CODEF_AUDIO_CONTEXT = new AudioContext(); // Atari YM Format !!! ;)
            CODEF_AUDIO_NODE = CODEF_AUDIO_CONTEXT.createScriptProcessor(8192);
            YmConst_PLAYER_FREQ = CODEF_AUDIO_CONTEXT.sampleRate;

            this.vu = [0, 0, 0];

            this.info = null;

            this.player = new YmProcessor(this);
            this.parse(data);
            this.stereo_value = false;
        }
    }

    YM.prototype.parse = function (data) {
        var binString = new dataType();
        var ff = [];

        if (data instanceof ArrayBuffer) {
            data = new Uint8Array(data);
        }

        for (var z = 0, l = data.length; z < l; z++) {
            ff[z] = String.fromCharCode(data[z]);
        }

        binString.data = ff.join('');

        this.player.stereo = this.stereo_value;

        data = binString;

        this.player.load(data);

        this.info = {
            title: this.player.song.title || 'unknown',
            author: this.player.song.author || 'unknown',
            comment: this.player.song.comment || 'unknown'
        }
    }

    YM.prototype.play = function () {
        if (this.player) {
            this.player.play();
        }
    }

    YM.prototype.stop = function () {
        if (this.player) {
            this.player.stop();
        }
    }

    YM.prototype.clearsong = function () {
        if (this.player) {
            this.player.reset();
        }
    }

    YM.prototype.stereo = function (stat) {
        this.stereo_value = stat;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // YM replay routine
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////
    //
    // YmConst.js
    //
    ////////////////////////////////////////////////////////////////////
    var YmConst_BUFFER_SIZE = 8192;
    var YmConst_PLAYER_FREQ = 48000;
    var YmConst_DRUM_PREC = 15;

    var YmConst_AMSTRAD_FREQ = 1000000;
    var YmConst_ATARI_FREQ = 2000000;
    var YmConst_SPECTRUM_FREQ = 1773400;

    var YmConst_INTERLEAVED = 1;
    var YmConst_DRUM_SIGNED = 2;
    var YmConst_DRUM_4BITS = 4;
    var YmConst_TIME_CONTROL = 8;
    var YmConst_LOOP_MODE = 16;

    var YmConst_MFP_PREDIV = [0, 4, 10, 16, 50, 64, 100, 200];

    var YmConst_MONO = [
        0.00063071586250394, 0.00163782667521185, 0.00269580167037975, 0.00383515935748365,
        0.00590024516535946, 0.00787377544480728, 0.01174962614825892, 0.01602221747489853,
        0.02299061047191789, 0.03141371908729311, 0.04648986276843572, 0.06340728985463016,
        0.09491256447035126, 0.13414919481999166, 0.21586759036022013, 0.33333333333333333
    ];

    var YmConst_STEREO = [
        0.00094607379375591, 0.00245674001281777, 0.00404370250556963, 0.00575273903622547,
        0.00885036774803918, 0.01181066316721091, 0.01762443922238838, 0.02403332621234779,
        0.03448591570787683, 0.04712057863093966, 0.06973479415265358, 0.09511093478194525,
        0.14236884670552690, 0.20122379222998749, 0.32380138554033021, 0.50000000000000000
    ];

    var YmConst_ENVELOPES = [
        15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0,
        15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0,
        15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0,
        15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
        15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
        15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0,
        15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ];

    ////////////////////////////////////////////////////////////////////
    //
    // YmSong.js
    //
    ////////////////////////////////////////////////////////////////////
    function YmSong(stream) {
        this.title;
        this.author;
        this.comment;

        this.attribs;
        this.clock;
        this.digidrums;
        this.drums;
        this.frames = new Array();
        this.frameSize;
        this.length;
        this.rate;
        this.restart;
        this.supported = true;

        this.data = new dataType();
        this.data.data = stream;

        this.init = function () {
            this.decode();
            if (this.attribs & YmConst_INTERLEAVED) this.deinterleave();

            for (i = 0; i < this.length; ++i) {
                this.frames[i] = this.data.readBytes(0, this.frameSize);
            }

        }

        this.decode = function () {
            var digidrum;
            var i;
            var id = this.data.readMultiByte(4, "txt");

            switch (id) {
                case "YM2!":
                case "YM3!":
                case "YM3b":
                    this.frameSize = 14;
                    this.length = (this.data.data.length - 4) / this.frameSize;
                    this.clock = YmConst_ATARI_FREQ;
                    this.rate = 50;
                    this.restart = (id != "YM3b") ? 0 : this.data.readByte();
                    this.attribs = YmConst_INTERLEAVED | YmConst_TIME_CONTROL;
                    break;

                case "YM4!":
                    this.supported = false;
                    break;

                case "YM5!":
                case "YM6!":
                    id = this.data.readMultiByte(8, "txt");
                    if (id != "LeOnArD!") {
                        this.supported = false;
                        return;
                    }

                    this.length = this.data.readInt();
                    this.attribs = this.data.readInt();
                    this.drums = this.data.readShort();
                    this.clock = this.data.readInt();
                    this.rate = this.data.readShort();
                    this.restart = this.data.readInt();
                    this.data.readShort();

                    if (this.drums) {
                        this.digidrums = new Array();

                        for (i = 0; i < this.drums; ++i) {
                            this.digidrum = new Digidrum(this.data.readInt());

                            if (this.digidrum.size != 0) {
                                this.digidrum.wave.data = this.data.readBytes(0, this.digidrum.size);
                                this.digidrum.convert(this.attribs);
                                this.digidrums[i] = this.digidrum;
                            }
                        }
                        this.attribs &= (~YmConst_DRUM_4BITS);
                    }

                    this.title = this.data.readString();
                    this.author = this.data.readString();
                    this.comment = this.data.readString();

                    this.frameSize = 16;
                    this.attribs = YmConst_INTERLEAVED | YmConst_TIME_CONTROL;
                    break;

                case "MIX1":
                    supported = false;
                    break;

                case "YMT1":
                case "YMT2":
                    supported = false;
                    break;

                default:
                    supported = false;
                    break;
            }

        }

        this.deinterleave = function () {
            var i;
            var j;
            var s = 0;

            var p = new Array();
            var r = new Array();

            for (i = 0; i < this.frameSize; ++i) p[i] = this.data.pos + (this.length * i);

            for (i = 0; i < this.length; ++i) {
                for (j = 0; j < this.frameSize; ++j) r[j + s] = this.data.data[i + p[j]];
                s += this.frameSize;
            }

            this.data.data = "";
            this.data.data = r;
            this.data.pos = 0;
            this.attribs &= (~YmConst_INTERLEAVED);
        }

        this.init();

    }

    ////////////////////////////////////////////////////////////////////
    //
    // YmProcessor.js
    //
    ////////////////////////////////////////////////////////////////////
    function YmProcessor(ym) {
        this.ym = ym;
        this.counter;

        this.sound;
        this.soundChannel;
        this.soundChannelPos;
        this.song;
        this.loop = 1;
        this.stereo = 0;

        this.audioFreq;
        this.clock;
        this.registers = new Array();
        this.volumeEnv;

        this.buffer;
        this.bufferSize;
        this.voiceA = new YmChannel(this);;
        this.voiceB = new YmChannel(this);;
        this.voiceC = new YmChannel(this);;

        this.samplesTick;
        this.samplesLeft;
        this.frame;

        this.envData;
        this.envPhase;
        this.envPos;
        this.envShape;
        this.envStep;

        this.noiseOutput;
        this.noisePos;
        this.noiseStep;
        this.rng;

        this.syncBuzzer;
        this.syncBuzzerPhase;
        this.syncBuzzerStep;
        __self = this;



        this.init = function () {
            var i;

            this.bufferSize = YmConst_BUFFER_SIZE;
            this.buffer = new Array();

            for (i = 0; i < this.bufferSize; ++i) this.buffer[i] = new Sample();

            this.envData = YmConst_ENVELOPES;
        }

        this.load = function (stream) {
            var monLHa = new LHa();
            this.song = new YmSong(monLHa.unpack(stream));

            this.audioFreq = YmConst_PLAYER_FREQ;
            this.clock = this.song.clock;
            this.samplesTick = this.audioFreq / this.song.rate;

            return this.song.supported;
        }

        this.play = function () {
            CODEF_AUDIO_NODE.onaudioprocess = function (event) {
                __self.mixer(event);

                __self.ym.vu[0] = __self.voiceA.vol;
                __self.ym.vu[1] = __self.voiceB.vol;
                __self.ym.vu[2] = __self.voiceC.vol;
            }
        }

        this.mixer = function (e) {
            var b = 0;
            var i = 0;
            var mixed = 0;
            var mixPos = 0;
            var sample;
            var size = 0;
            var toMix = 0;
            var value = 0;

            while (mixed < this.bufferSize) {
                if (this.samplesLeft == 0) {
                    if (this.frame >= this.song.length) {
                        if (this.loop) {
                            this.frame = this.song.restart;
                        } else {
                            this.stop();
                            return;
                        }
                    }

                    this.syncBuzzerStop();

                    for (i = 0; i < this.song.frameSize; i++) {
                        this.registers[i] = this.song.frames[this.frame][i].charCodeAt(0);
                    }
                    this.frame++;
                    //this.registers = this.song.frames[this.frame++];
                    this.updateEffects(1, 6, 14);
                    this.updateEffects(3, 8, 15);

                    this.writeRegisters();
                    this.samplesLeft = this.samplesTick;
                }

                toMix = this.samplesLeft;
                if ((mixed + toMix) > this.bufferSize)
                    toMix = this.bufferSize - mixed;
                size = mixPos + toMix;

                for (i = mixPos; i < size; ++i) {
                    sample = this.buffer[i];

                    if (this.noisePos & 65536) {
                        b = (this.rng & 1) ^ ((this.rng >> 2) & 1);
                        this.rng = (this.rng >> 1) | (b << 16);
                        this.noiseOutput ^= (b ? 0 : 65535);
                        this.noisePos &= 65535;
                    }

                    this.volumeEnv = this.envData[Math.floor((this.envShape << 6) + (this.envPhase << 5) + (this.envPos >> 26))];

                    this.voiceA.computeVolume();
                    this.voiceB.computeVolume();
                    this.voiceC.computeVolume();

                    b = this.voiceA.enabled() & (this.noiseOutput | this.voiceA.mixNoise);
                    var toto = this.voiceA.getvolume();
                    sample.voiceA = (b) ? this.voiceA.getvolume() : -1;
                    b = this.voiceB.enabled() & (this.noiseOutput | this.voiceB.mixNoise);
                    sample.voiceB = (b) ? this.voiceB.getvolume() : -1;
                    b = this.voiceC.enabled() & (this.noiseOutput | this.voiceC.mixNoise);
                    sample.voiceC = (b) ? this.voiceC.getvolume() : -1;

                    this.voiceA.next();
                    this.voiceB.next();
                    this.voiceC.next();

                    this.noisePos += this.noiseStep;
                    this.envPos += this.envStep;
                    if (this.envPos > 2147483647)
                        this.envPos -= 2147483647;
                    if (this.envPhase == 0 && this.envPos < this.envStep)
                        envPhase = 1;

                    if (this.syncBuzzer) {
                        this.syncBuzzerPhase += this.syncBuzzerStep;

                        if (this.syncBuzzerPhase & 1073741824) {
                            this.envPos = 0;
                            this.envPhase = 0;
                            this.syncBuzzerPhase &= 0x3fffffff;
                        }
                    }
                }

                mixed += toMix;
                mixPos = size;
                this.samplesLeft -= toMix;
            }

            var l = event.outputBuffer.getChannelData(0);
            var r = event.outputBuffer.getChannelData(1);

            if (this.stereo) {
                for (i = 0; i < this.bufferSize; ++i) {
                    sample = this.buffer[i];
                    l[i] = sample.left();
                    r[i] = sample.right();
                }
            } else {

                for (i = 0; i < this.bufferSize; ++i) {
                    value = this.buffer[i].mono();
                    l[i] = value;
                    r[i] = value;
                }
            }

        }

        this.writeRegisters = function () {
            var p;

            this.registers[0] &= 255;
            this.registers[1] &= 15;
            this.voiceA.computeTone(this.registers[1], this.registers[0]);

            this.registers[2] &= 255;
            this.registers[3] &= 15;
            this.voiceB.computeTone(this.registers[3], this.registers[2]);

            this.registers[4] &= 255;
            this.registers[5] &= 15;
            this.voiceC.computeTone(this.registers[5], this.registers[4]);

            this.registers[6] &= 31;

            if (this.registers[6] < 3) {
                this.noisePos = 0;
                this.noiseOutput = 65535;
                this.noiseStep = 0;
            } else {
                p = this.clock / ((this.registers[6] << 3) * this.audioFreq);
                this.noiseStep = Math.floor(p * 32768);
            }

            this.registers[7] &= 255;

            this.voiceA.mixTone = (this.registers[7] & 1) ? 65535 : 0;
            this.voiceB.mixTone = (this.registers[7] & 2) ? 65535 : 0;
            this.voiceC.mixTone = (this.registers[7] & 4) ? 65535 : 0;

            this.voiceA.mixNoise = (this.registers[7] & 8) ? 65535 : 0;
            this.voiceB.mixNoise = (this.registers[7] & 16) ? 65535 : 0;
            this.voiceC.mixNoise = (this.registers[7] & 32) ? 65535 : 0;

            this.registers[8] &= 31;
            this.voiceA.setvolume(this.registers[8]);
            this.registers[9] &= 31;
            this.voiceB.setvolume(this.registers[9]);
            this.registers[10] &= 31;
            this.voiceC.setvolume(this.registers[10]);

            this.registers[11] &= 255;
            this.registers[12] &= 255;
            p = (this.registers[12] << 8) | this.registers[11];

            if (p < 3) {
                this.envStep = 0;
            } else {
                p = this.clock / ((p << 8) * this.audioFreq);
                this.envStep = Math.floor(p * 1073741824);
            }

            if (this.registers[13] == 255) {
                this.registers[13] = 0;
            } else {
                this.registers[13] &= 15;
                this.envPhase = 0;
                this.envPos = 0;
                this.envShape = this.registers[13];
            }

        }

        this.updateEffects = function (code, preDiv, count) {
            var index = 0;
            var tmpFreq = 0;
            var voice = 0;

            code = this.registers[code] & 0xf0;
            preDiv = (this.registers[preDiv] >> 5) & 7;
            count = this.registers[count];

            if (code & 0x30) {
                voice = ((code & 0x30) >> 4) - 1;

                switch (code & 0xc0) {
                    case 0x00:
                    case 0x80:
                        break;
                    case 0x40:
                        index = this.registers[voice + 8] & 31;

                        if ((index >= 0) && (index < this.song.drums)) {
                            preDiv = YmConst_MFP_PREDIV[preDiv] * count;
                            if (preDiv > 0) {
                                tmpFreq = 2457600 / preDiv;

                                if (voice == 0) {
                                    this.voiceA.drum = this.song.digidrums[index];
                                    this.voiceA.drumStart(tmpFreq);
                                } else if (voice == 1) {
                                    this.voiceB.drum = this.song.digidrums[index];
                                    this.voiceB.drumStart(tmpFreq);
                                } else if (voice == 2) {
                                    this.voiceC.drum = this.song.digidrums[index];
                                    this.voiceC.drumStart(tmpFreq);
                                }
                            }
                        }
                        break;
                    case 0xc0:
                        break;
                }
            }
        }

        this.syncBuzzerStart = function (timerFreq, shapeEnv) {
            this.envShape = this.shapeEnv & 15;
            this.syncBuzzerStep = (this.timerFreq * 1073741824) / this.audioFreq;;
            this.syncBuzzerPhase = 0;
            this.syncBuzzer = true;
        }

        this.syncBuzzerStop = function () {
            this.syncBuzzer = false;
            this.syncBuzzerPhase = 0;
            this.syncBuzzerStep = 0;
        }

        this.stop = function () {

            this.reset();
            return true;
        }

        this.reset = function () {
            var i;

            this.voiceA = new YmChannel(this);
            this.voiceB = new YmChannel(this);
            this.voiceC = new YmChannel(this);
            this.samplesLeft = 0;
            this.frame = 0;

            this.registers = new Array();
            for (i = 0; i < 16; ++i)
                this.registers[i] = 0;
            this.registers[7] = 255;

            this.writeRegisters();
            this.volumeEnv = 0;

            this.noiseOutput = 65535;
            this.noisePos = 0;
            this.noiseStep = 0;
            this.rng = 1;

            this.envPhase = 0;
            this.envPos = 0;
            this.envShape = 0;
            this.envStep = 0;

            this.syncBuzzerStop();
        }

        this.init();
        this.reset();

        CODEF_AUDIO_NODE.connect(CODEF_AUDIO_CONTEXT.destination);

    }

    ////////////////////////////////////////////////////////////////////
    //
    // Sample.js
    //
    ////////////////////////////////////////////////////////////////////
    function Sample() {
        this.voiceA = -1;
        this.voiceB = -1;
        this.voiceC = -1;



        this.mono = function () {
            var v = YmConst_MONO;
            var vol = 0.0;

            if (this.voiceA > -1) vol += v[this.voiceA];
            if (this.voiceB > -1) vol += v[this.voiceB];
            if (this.voiceC > -1) vol += v[this.voiceC];
            return vol;
        }

        this.left = function () {
            var v = YmConst_STEREO;
            var vol = 0.0;

            if (this.voiceA > -1) vol += v[this.voiceA];
            if (this.voiceB > -1) vol += v[this.voiceB];
            return vol;
        }

        this.right = function () {
            var v = YmConst_STEREO;
            var vol = 0.0;

            if (this.voiceB > -1) vol += v[this.voiceB];
            if (this.voiceC > -1) vol += v[this.voiceC];
            return vol;
        }
    }
    ////////////////////////////////////////////////////////////////////
    //
    // YmChannel.js
    //
    ////////////////////////////////////////////////////////////////////
    function YmChannel(processor) {
        this.mixNoise = 0;
        this.mixTone = 0;
        this.mode = 0;
        this.position = 0;
        this.step = 0;

        this.digidrum = 0;
        this.drum = 0;
        this.drumPos = 0;
        this.drumStep = 0;

        this.processor = processor;
        this.vol = 0;

        this.enabled = function () {
            return (this.position >> 30) | this.mixTone;
        }

        this.getvolume = function () {
            return (this.mode) ? this.processor.volumeEnv : this.vol;
        }

        this.setvolume = function (value) {
            if (value & 16)
                this.mode = true
            else
                this.mode = false;
            this.vol = value;
        }

        this.next = function () {
            this.position += this.step;
            if (this.position > 2147483647) this.position -= 2147483647;
        }

        this.computeTone = function (high, low) {
            var p = (high << 8) | low;

            if (p < 5) {
                this.position = 1073741824;
                this.step = 0;
            } else {
                p = this.processor.clock / ((p << 3) * this.processor.audioFreq);
                this.step = Math.floor(p * 1073741824);
            }
        }

        this.computeVolume = function () {
            var pos;

            if (this.digidrum) {
                pos = this.drumPos >> YmConst_DRUM_PREC;
                this.vol = this.drum.data[pos] / 16; //6;
                this.mixNoise = 65535;
                this.mixTone = 65535;

                this.drumPos += this.drumStep;
                pos = this.drumPos >> YmConst_DRUM_PREC;
                if (pos >= this.drum.size)
                    this.digidrum = false;
            }
        }

        this.drumStart = function (drumFreq) {
            this.digidrum = true;
            this.drumPos = 0;
            this.drumStep = (this.drumFreq << 15) / this.processor.audioFreq;
        }

        this.drumStop = function () {
            this.digidrum = false;
        }

    }

    ////////////////////////////////////////////////////////////////////
    //
    // Digidrum.js
    //
    ////////////////////////////////////////////////////////////////////
    function Digidrum(size) {
        this.data;
        this.repeatLen;
        this.size;
        this.wave = null;

        this.size = size;

        this.wave = new dataType();

        this.convert = function (attribs) {
            var b;
            var i;
            this.data = new Array;

            if (attribs & YmConst_DRUM_4BITS) {
                for (i = 0; i < this.size; ++i) {
                    b = (this.wave.readByte() & 15) >> 7;
                    this.data[i] = YmConst_MONO[b];
                }
            } else {
                for (i = 0; i < this.size; ++i) {
                    this.data[i] = this.wave.readByte(); // / 255;
                }
            }
            this.wave = null;
        }

    }

    function dataType() {
        this.data;
        this.pos = 0;
        this.endian = "BIG";


        this.readBytes = function (offset, nb) {
            var tmp = "";
            for (var i = 0; i < nb; i++) {
                tmp += this.data[offset + this.pos++];
            }
            return tmp;
        }

        this.readMultiByte = function (nb, type) {
            if (type == "txt") {
                var tmp = "";
                for (var i = 0; i < nb; i++) {
                    tmp += this.data[this.pos++]
                }
                return tmp;
            }
        }

        this.readInt = function () {
            var tmp1 = parseInt(this.data[this.pos + 0].charCodeAt(0).toString(16), 16);
            var tmp2 = parseInt(this.data[this.pos + 1].charCodeAt(0).toString(16), 16);
            var tmp3 = parseInt(this.data[this.pos + 2].charCodeAt(0).toString(16), 16);
            var tmp4 = parseInt(this.data[this.pos + 3].charCodeAt(0).toString(16), 16);
            if (this.endian == "BIG")
                var tmp = (tmp1 << 24) | (tmp2 << 16) | (tmp3 << 8) | tmp4;
            else
                var tmp = (tmp4 << 24) | (tmp3 << 16) | (tmp2 << 8) | tmp1;
            this.pos += 4;
            return tmp;
        }

        this.readShort = function () {
            var tmp1 = parseInt(this.data[this.pos + 0].charCodeAt(0).toString(16), 16);
            var tmp2 = parseInt(this.data[this.pos + 1].charCodeAt(0).toString(16), 16);
            var tmp = (tmp1 << 8) | tmp2;
            this.pos += 2;
            return tmp;
        }
        this.readByte = function () {
            var tmp = parseInt(this.data[this.pos].charCodeAt(0).toString(16), 16)
            this.pos += 1;
            return tmp;
        }
        this.readString = function () {
            var tmp = "";
            while (1) {
                if (this.data[this.pos++].charCodeAt(0) != 0)
                    tmp += this.data[this.pos - 1];
                else
                    return tmp;
            }
        }

        this.substr = function (start, nb) {
            return this.data.substr(start, nb);
        }

        this.bytesAvailable = function () {
            return this.length - this.pos;
        }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // LHA depack routine
    //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function LHa() {
        this.data;

        this.source;
        this.buffer;
        this.output;
        this.srcSize;
        this.dstSize;
        this.srcPos;
        this.dstPos;

        this.c_Table;
        this.p_Table;
        this.c_Len;
        this.p_Len;
        this.l_Tree;
        this.r_Tree;

        this.bitBuffer;
        this.bitCount;
        this.subBuffer;
        this.blockSize;
        this.fillBufferSize;
        this.fillIndex;
        this.decodei;
        this.decodej;


        this.data = "";
        this.buffer = new Array();
        this.output = new Array();

        this.c_Table = new Array();
        this.p_Table = new Array();
        this.c_Len = new Array();
        this.p_Len = new Array();
        this.l_Tree = new Array();
        this.r_Tree = new Array();


        this.unpack = function (source) {
            this.header = new LHaHeader(source);
            if (this.header.size == 0 || this.header.method != "-lh5-" || this.header.level != 0) return source.data;

            this.source = source;
            this.srcSize = this.header.packed;
            this.srcPos = this.source.pos;
            this.dstSize = this.header.original;

            this.fillBufferSize = 0;
            this.bitBuffer = 0;
            this.bitCount = 0;
            this.subBuffer = 0;
            this.fillBuffer(16);
            this.blockSize = 0;
            this.decodej = 0;

            var l = this.dstSize;
            var n;
            var np;

            while (l != 0) {
                n = l > 8192 ? 8192 : l;
                this.decode(n);
                np = n > this.dstSize ? this.dstSize : n;

                if (np > 0) {
                    this.output.pos = 0;
                    for (var yop = 0; yop < np; yop++) {
                        this.data += String.fromCharCode(this.output[yop]);
                    }
                    this.dstPos += np;
                    this.dstSize -= np;
                }

                l -= n;
            }

            this.buffer = "";
            this.output = new Array;
            return this.data;
        }

        this.decode = function (count) {
            var c;
            var r = 0;

            while (--this.decodej >= 0) {
                this.output[r] = this.output[this.decodei];
                this.decodei = ++this.decodei & 8191;
                if (++r == count) return;
            }

            for (;;) {
                c = this.decode_c();

                if (c <= 255) {
                    this.output[r] = c;
                    if (++r == count) return;
                } else {
                    this.decodej = c - 253;
                    this.decodei = (r - this.decode_p() - 1) & 8191;

                    while (--this.decodej >= 0) {
                        this.output[r] = this.output[this.decodei];
                        this.decodei = ++this.decodei & 8191;
                        if (++r == count) return;
                    }
                }
            }
        }

        this.decode_c = function () {
            var j;
            var mask = 0;

            if (this.blockSize == 0) {
                this.blockSize = this.getBits(16);
                this.read_p(19, 5, 3);
                this.read_c();
                this.read_p(14, 4, -1);
            }

            this.blockSize--;
            j = this.c_Table[this.bitBuffer >> 4];

            if (j >= 510) {
                mask = 1 << 3;

                do {
                    j = (this.bitBuffer & mask) ? this.r_Tree[j] : this.l_Tree[j];
                    mask >>= 1;
                } while (j >= 510);
            }

            this.fillBuffer(this.c_Len[j]);
            return j & 0xffff;
        }



        this.decode_p = function () {
            var j = this.p_Table[this.bitBuffer >> 8];
            var mask = 0;

            if (j >= 14) {
                mask = 1 << 7;

                do {
                    j = (this.bitBuffer & mask) ? this.r_Tree[j] : this.l_Tree[j];
                    mask >>= 1;
                } while (j >= 14);
            }

            this.fillBuffer(this.p_Len[j]);
            if (j != 0) j = (1 << (j - 1)) + this.getBits(j - 1);
            return j & 0xffff;
        }

        this.read_c = function () {
            var c;
            var i = 0;
            var mask = 0
            var n = this.getBits(9);

            if (n == 0) {
                c = this.getBits(9);
                for (i = 0; i < 510; ++i) this.c_Len[i] = 0;
                for (i = 0; i < 4096; ++i) this.c_Table[i] = c;
            } else {
                while (i < n) {
                    c = this.p_Table[this.bitBuffer >> 8];

                    if (c >= 19) {
                        mask = 1 << 7;
                        do {
                            c = (this.bitBuffer & mask) ? this.r_Tree[c] : this.l_Tree[c];
                            mask >>= 1;
                        } while (c >= 19);
                    }

                    this.fillBuffer(this.p_Len[c]);

                    if (c <= 2) {
                        if (c == 0)
                            c = 1;
                        else if (c == 1)
                            c = this.getBits(4) + 3;
                        else
                            c = this.getBits(9) + 20;

                        while (--c >= 0) this.c_Len[i++] = 0;
                    } else {
                        this.c_Len[i++] = c - 2;
                    }
                }

                while (i < 510) this.c_Len[i++] = 0;
                this.makeTable(510, this.c_Len, 12, this.c_Table);
            }
        }

        this.read_p = function (nn, nbit, iSpecial) {
            var c;
            var i = 0;
            var mask = 0;
            var n = this.getBits(nbit);

            if (n == 0) {
                c = this.getBits(nbit);
                for (i = 0; i < nn; ++i) this.p_Len[i] = 0;
                for (i = 0; i < 256; ++i) this.p_Table[i] = c;
            } else {
                while (i < n) {
                    c = this.bitBuffer >> 13;

                    if (c == 7) {
                        mask = 1 << 12;

                        while (mask & this.bitBuffer) {
                            mask >>= 1;
                            c++;
                        }
                    }

                    this.fillBuffer(c < 7 ? 3 : c - 3);
                    this.p_Len[i++] = c;

                    if (i == iSpecial) {
                        c = this.getBits(2);
                        while (--c >= 0) this.p_Len[i++] = 0;
                    }
                }

                while (i < nn) this.p_Len[i++] = 0;
                this.makeTable(nn, this.p_Len, 8, this.p_Table);
            }
        }

        this.getBits = function (n) {
            var r = this.bitBuffer >> (16 - n);
            this.fillBuffer(n);
            return r & 0xffff;
        }

        this.fillBuffer = function (n) {
            var np;

            this.bitBuffer = (this.bitBuffer << n) & 0xffff;

            while (n > this.bitCount) {
                this.bitBuffer |= this.subBuffer << (n -= this.bitCount);
                this.bitBuffer &= 0xffff;

                if (this.fillBufferSize == 0) {
                    this.fillIndex = 0;
                    np = this.srcSize > 4064 ? 4064 : this.srcSize;

                    if (np > 0) {
                        this.source.pos = this.srcPos;
                        this.buffer = this.source.readBytes(0, np);
                        this.srcPos += np;
                        this.srcSize -= np;
                    }

                    this.fillBufferSize = np;
                }

                if (this.fillBufferSize > 0) {
                    this.fillBufferSize--;
                    this.subBuffer = this.buffer[this.fillIndex++].charCodeAt(0);
                } else {
                    this.subBuffer = 0;
                }

                this.bitCount = 8;
            }

            this.bitBuffer |= this.subBuffer >> (this.bitCount -= n);
            this.bitBuffer &= 0xffff;
        }

        this.makeTable = function (nchar, bitlen, tablebits, table) {
            var a = nchar;
            var h;
            var i;
            var j;
            var k;
            var l;
            var n;
            var p;
            var t;
            var r;
            var c = new Array();
            var w = new Array();
            var s = new Array();
            var mask = 1 << (15 - tablebits);
            for (i = 0; i < nchar; ++i)
                c[i] = 0;

            for (i = 0; i < nchar; ++i) c[bitlen[i]]++;

            s[1] = 0;
            for (i = 1; i < 17; ++i) s[i + 1] = (s[i] + (c[i] << (16 - i))) & 0xffff;

            if (s[17] != 0) return false;
            j = 16 - tablebits;

            for (i = 1; i <= tablebits; ++i) {
                s[i] >>= j;
                w[i] = 1 << (tablebits - i);
            }

            while (i < 17) w[i] = 1 << (16 - i++);
            i = s[tablebits + 1] >> j;

            if (i != 0) {
                k = 1 << tablebits;
                while (i != k) table[i++] = 0;
            }

            for (h = 0; h < nchar; ++h) {
                if ((l = bitlen[h]) == 0) continue;
                n = s[l] + w[l];

                if (l <= tablebits) {
                    for (i = s[l]; i < n; ++i) table[i] = h;
                } else {
                    i = l - tablebits;
                    k = s[l];
                    p = k >> j;
                    t = table;

                    while (i != 0) {
                        if (t[p] == 0) {
                            this.l_Tree[a] = 0;
                            this.r_Tree[a] = 0;
                            t[p] = a++;
                        }

                        r = (k & mask) ? this.r_Tree : this.l_Tree;
                        k <<= 1;
                        i--;
                    }

                    r[t[p]] = h;
                }
                s[l] = n;
            }

            return true;
        }

    }


    function LHaHeader(source) {
        this.size;
        this.checksum;
        this.method;
        this.packed;
        this.original;
        this.timeStamp;
        this.attribute;
        this.level;
        this.nameLength;
        this.name;

        source.endian = "LITTLE";
        source.pos = 0;

        this.size = source.readByte();
        this.checksum = source.readByte();
        this.method = source.readMultiByte(5, "txt");
        this.packed = source.readInt();
        this.original = source.readInt();
        this.timeStamp = source.readInt();
        this.attribute = source.readByte();
        this.level = source.readByte();
        this.nameLength = source.readByte();
        this.name = source.readMultiByte(this.nameLength, "txt");

        source.readShort();
    }

    window.YM = YM;
}());
