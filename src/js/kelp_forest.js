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
});
