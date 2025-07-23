document.addEventListener('DOMContentLoaded', () => {
    const dialogue_text_element = document.getElementById('dialogue-text');
    const dialogue_box = document.getElementById('dialogue-box');
    const dialogue_sound = document.getElementById('dialogue-sound');


    if (localStorage.getItem('hasSeenIntro') !== 'true') {

        const dialogues = [
            "Glub Glub: Oh look its a pufferfish.",
            "Glub Glub: I wonder if he knows anything about a Meow Meow.",
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
    }

    document.addEventListener('keydown', (event) => {
        if (event.code !== 'Space') {
            return;
        }

        const puffer_x = window.innerWidth / 1.4;
        const puffer_y = window.innerHeight / 1.7;
        const interaction_radius = 75;

        const is_near_puffer = Math.abs(x - puffer_x) < interaction_radius &&
            Math.abs(y - puffer_y) < interaction_radius;

        if (is_near_puffer) {
            dialogue_box.style.display = 'block';

            const dialogues = [
                "Seaweed Puffer: ohhh mannn what am I going to do???",
                "Seaweed Puffer: my dog ran away from me.",
                "Seaweed Puffer: i took my eyes off of him for just a second and he's gone...",
                "Seaweed Puffer: hey! you!",
                "Seaweed Puffer: could you help me find my dog?",
                "Glub Glub: mmm I guess so, only if you can hel-",
                "Seaweed Puffer: PERFECT",
                "Seaweed Puffer: i last saw him when i was at the jellyfish casino.",
                ""
            ];

            const puffer_dialogue = new dialogue_manager(dialogue_text_element, dialogues, dialogue_sound);
            puffer_dialogue.start(() => {
                dialogue_box.style.display = 'none';
            });

            document.body.addEventListener('click', () => {
                puffer_dialogue.show_next_dialogue();
            });
        }
    });
});
