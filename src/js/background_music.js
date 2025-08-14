document.addEventListener('DOMContentLoaded', () => {

    const keys_pressed = {
        w: false,
        a: false,
        s: false,
        d: false,
        Shift: false
    };

    const background_music = document.getElementById('background-music');
    const saved_time = sessionStorage.getItem('music_time');

    if (background_music) {
        if (saved_time) {
            background_music.currentTime = parseFloat(saved_time);
        }
    }

    document.addEventListener('keydown', (event) => {
        const key = event.key;
        background_music.play();

        if (key === 'Shift') {
            keys_pressed.Shift = true;
        } else if (key.toLowerCase() in keys_pressed) {
            keys_pressed[key.toLowerCase()] = true;
        }
    });
});