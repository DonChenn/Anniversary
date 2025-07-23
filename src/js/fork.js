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
            "Glub Glub: i have no clue where this casino is.",
            "Glub Glub: if i swim up a little higher, i could have a better view...",
            "Glub Glub: huhh?? there seems to be something blocking the path upwards.",
            "Glub Glub: maybe there's another clue to see where it is.",
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