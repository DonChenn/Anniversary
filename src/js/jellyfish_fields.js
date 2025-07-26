document.addEventListener('DOMContentLoaded', () => {
    const dialogue_text_element = document.getElementById('dialogue-text');
    const dialogue_box = document.getElementById('dialogue-box');
    const dialogue_sound = document.getElementById('dialogue-sound');
    let current_dialogue = null;
    const dog = document.getElementById('dog');

    if (localStorage.getItem('dog_picked_up')) {
        dog.style.display = 'none';
    }

    document.body.addEventListener('click', () => {
        if (current_dialogue) {
            current_dialogue.show_next_dialogue();
        }
    });

    if (localStorage.getItem('has_seen_intro') !== 'true') {
        const dialogues = [
            "Glub Glub: thats the dog! lemme catch him.",
            ""
        ];

        const dialogue_manager_instance = new dialogue_manager(dialogue_text_element, dialogues, dialogue_sound);
        current_dialogue = dialogue_manager_instance;
        dialogue_manager_instance.start(() => {
            dialogue_box.style.display = 'none';
            localStorage.setItem('has_seen_intro', 'true');
            current_dialogue = null;
        });

    } else {
        document.getElementById('dialogue-box').style.display = 'none';
    }

    document.addEventListener('keydown', (event) => {
        if (event.code !== 'Space') {
            return;
        }

        const dog_x = window.innerWidth / 1.5;
        const dog_y = window.innerHeight / 1.2;
        const interaction_radius = 100;

        const is_near_dog = Math.abs(x - dog_x) < interaction_radius &&
            Math.abs(y - dog_y) < interaction_radius;

        if (is_near_dog) {
            dialogue_box.style.display = 'block';
            dog.style.display = 'none';
            localStorage.setItem('dog_picked_up', 'true');

            const dialogues = [
                "Glub Glub: i should return this dog to that stupid looking pufferfish.",
                ""
            ];

            const return_dog = new dialogue_manager(dialogue_text_element, dialogues, dialogue_sound);
            current_dialogue = return_dog;
            return_dog.start(() => {
                dialogue_box.style.display = 'none';
            })
        }
    });
});