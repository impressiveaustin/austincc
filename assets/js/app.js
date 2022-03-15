'use strict';
const qS = q => document.querySelector(q);
document.getElementsByTagName('video')[0].volume = 0.1;
const video = qS('video');
let audioCtx, audioAnalyser, audioSource, bufferLength = 128,
    dataArray, width, height, initialized = false;

function initAudio() {
    audioCtx = new(window.AudioContext || window.webkitAudioContext)();
    audioAnalyser = audioCtx.createAnalyser();
    audioAnalyser.smoothingTimeConstant = 0.5;
    audioSource = audioCtx.createMediaElementSource(video);
    audioSource.connect(audioAnalyser);
    audioAnalyser.connect(audioCtx.destination);
    audioAnalyser.fftSize = 512;
    bufferLength = audioAnalyser.frequencyBinCount / 2;
    dataArray = new Uint8Array(bufferLength);
}

document.body.addEventListener('click', _ => {
    if (!initialized) {
        video.muted = false;
        initAudio();
        initialized = true;
        qS('.hint').style.display = 'none';
    }
});