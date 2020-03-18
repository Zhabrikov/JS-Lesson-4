function soundStart(sound, autoplay, vol) {
    sound.play();
    sound.loop = autoplay;
    sound.volume = vol;
}

function soundStop(sound) {   
    sound.pause();  
}