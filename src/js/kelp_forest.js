document.addEventListener('DOMContentLoaded', () => {
    const dialogue_text_element = document.getElementById('dialogue-text');
    const dialogue_box = document.getElementById('dialogue-box');
    const dialogue_sound = document.getElementById('dialogue-sound');

    const dialogues = [
        "Glub Glub: I think I dropped something when I spiraled down.",
        "Glub Glub: It must be behind somewhere behind all this kelp.",
        "Use ␣ to interact",
        ""
    ];

    const dialogue_manager_instance = new dialogue_manager(dialogue_text_element, dialogues, dialogue_sound);
    dialogue_manager_instance.start(() => {
        dialogue_box.style.display = 'none';
    });

    document.body.addEventListener('click', () => {
        dialogue_manager_instance.show_next_dialogue();
    });

    document.addEventListener('keydown', (event) => {
        if (event.code !== 'Space') {
            return;
        }

        if (is_note_visible) {
            note_overlay.style.display = 'none';
            is_note_visible = false;
            return;
        }

        const bottle_x = window.innerWidth / 2.3;
        const bottle_y = window.innerHeight / 1.2;
        const interaction_radius = 75;

        const is_near_bottle = Math.abs(x - bottle_x) < interaction_radius &&
            Math.abs(y - bottle_y) < interaction_radius;

        if (is_near_bottle) {
            note_overlay.style.display = 'flex';
            is_note_visible = true;
        }
    });
});
