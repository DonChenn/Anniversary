let music_started = false;
document.addEventListener('keydown', (event) => {
    const water_background = document.getElementById('background-music');
    water_background.play();
    if (event.key === 'm') {
        if (!music_started) {
            water_background.play();
            music_started = true;
        } else {
            water_background.pause();
            music_started = false;
        }
    }
});