const runway_music = document.getElementById("background-music");
runway_music.pause();
document.addEventListener('keydown', (event) => {
    if (event.code !== 'Space') {
        return;
    }

    const switch_x = window.innerWidth / 8;
    const switch_y = window.innerHeight / 2;
    const interaction_radius = 75;

    const is_near_switch = Math.abs(x - switch_x) < interaction_radius &&
        Math.abs(y - switch_y) < interaction_radius;

    if (is_near_switch) {
        runway_music.play();
    }
});