document.addEventListener('DOMContentLoaded', () => {
    const water_background = document.getElementById('background-music');
    const saved_time = sessionStorage.getItem('music_time');

    if (water_background) {
        if (saved_time) {
            water_background.currentTime = parseFloat(saved_time);
        }
    }
});