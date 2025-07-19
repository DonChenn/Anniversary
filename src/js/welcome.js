document.addEventListener('DOMContentLoaded', () => {
    const dialogue_text_element = document.getElementById('dialogue-text');
    const dialogue_sound = document.getElementById('dialogue-sound');

    const dialogues = [
        "Glub Glub: Woah what am I doing in depths of the ocean? I seemed to lost my memory. aghh It's cold, scary, and spooooky down here.",
        "Glub Glub: I don't remember anything, but I have a feeling that I MUST find Meow Meow.",
        "Glub Glub: The issue is...",
        "Glub Glub: Who is Meow Meow?",
        "Glub Glub: What is a Meow Meow?",
        "Glub Glub: Where is Meow Meow?",
        "Glub Glub: What does Meow Meow mean to me?",
        "I need to find a way to get back to Meow Meow.",
        'use "WASD" to move',
        ""
    ];

    const dialogue_manager_instance = new dialogue_manager(dialogue_text_element, dialogues, dialogue_sound);
    dialogue_manager_instance.start();

    document.body.addEventListener('click', () => {
        dialogue_manager_instance.show_next_dialogue();
    });
});
