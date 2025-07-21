document.addEventListener('DOMContentLoaded', () => {
    const dialogue_text_element = document.getElementById('dialogue-text');
    const dialogue_box = document.getElementById('dialogue-box');
    const dialogue_sound = document.getElementById('dialogue-sound');

    const dialogues = [
        "Glub Glub: It's pitch black in here!",
        "Glub Glub: Maybe there's a light switch around...",
        ""
    ];

    const dialogue_manager_instance = new dialogue_manager(dialogue_text_element, dialogues, dialogue_sound);
    dialogue_manager_instance.start(() => {
        dialogue_box.style.display = 'none';
    });

    document.body.addEventListener('click', () => {
        dialogue_manager_instance.show_next_dialogue();
    });

    const runway_music = document.getElementById("background-music");
    const shutter_sound = document.getElementById("shutter_sound");
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
            document.body.classList.add('activated');
            runway_music.play();
            shutter_sound.play();
        }
    });
});