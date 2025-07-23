document.addEventListener('DOMContentLoaded', () => {
    const dialogue_text_element = document.getElementById('dialogue-text');
    const dialogue_box = document.getElementById('dialogue-box');
    const dialogue_sound = document.getElementById('dialogue-sound');
    let current_dialogue = null;

    document.body.addEventListener('click', () => {
        if (current_dialogue) {
            current_dialogue.show_next_dialogue();
        }
    });

    if (localStorage.getItem('fork_intro') !== 'true') {
        const dialogues = [
            "Glub Glub: there seems to be an object blocking the path above me...",
            "Glub Glub: but for now... where can i find this jellyfish casino?",
            "Glub Glub: coins! following them is probably a good indicator!",
            "use m to view the map",
            ""
        ];

        const dialogue_manager_instance = new dialogue_manager(dialogue_text_element, dialogues, dialogue_sound);
        current_dialogue = dialogue_manager_instance;
        dialogue_manager_instance.start(() => {
            dialogue_box.style.display = 'none';
            localStorage.setItem('fork_intro', 'true');
            current_dialogue = null;
        });
    } else {
        document.getElementById('dialogue-box').style.display = 'none';
    }
})