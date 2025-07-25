document.addEventListener('DOMContentLoaded', () => {
    const dialogue_text_element = document.getElementById('dialogue-text');
    const dialogue_box = document.getElementById('dialogue-box');
    const dialogue_sound = document.getElementById('dialogue-sound');
    const quest_exclaim = document.getElementById('quest_icon');
    const quest_pending = document.getElementById('quest_pending_icon');
    const dog = document.getElementById('dog');
    let current_dialogue = null;

    if (!localStorage.getItem('quest_complete')) {
        dog.style.display = 'none';
    }

    if (localStorage.getItem('dog_quest_accepted') === 'true') {
        quest_exclaim.style.display = 'none';
        quest_pending.style.display = 'block';
    } else {
        quest_exclaim.style.display = 'block';
        quest_pending.style.display = 'none';
    }

    if (localStorage.getItem('quest_complete')) {
        quest_pending.style.display = 'none';
    }

    document.body.addEventListener('click', () => {
        if (current_dialogue) {
            current_dialogue.show_next_dialogue();
        }
    });

    if (localStorage.getItem('has_seen_intro') !== 'true') {
        const dialogues = [
            "Glub Glub: Oh look its a stupid looking pufferfish.",
            "Glub Glub: I wonder if he knows anything about a Meow Meow.",
            "Use ␣ to interact",
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

        const puffer_x = window.innerWidth / 1.5;
        const puffer_y = window.innerHeight / 1.45;
        const interaction_radius = 100;

        const is_near_puffer = Math.abs(x - puffer_x) < interaction_radius &&
            Math.abs(y - puffer_y) < interaction_radius;

        if (is_near_puffer) {
            dialogue_box.style.display = 'block';

            if (localStorage.getItem('dog_quest_accepted') === 'true') {
                if (localStorage.getItem('dog_picked_up')) {
                    const dialogues = [
                        "Stupid Looking Pufferfish: thank you so much!",
                        "Glub Glub: no worries. could you help me out?",
                        "Glub Glub: have you seen a cat anywhere? i got a little lost.",
                        "Stupid Looking Pufferfish: oh i have. ive seen a cat at the bottom of the ocean. he's a little shy.",
                        "Glub Glub: oooh Meow Meow is a little sigma. ill take a look ty!",
                        ""
                    ];

                    quest_pending.style.display = 'none';
                    dog.style.display = 'block';

                    localStorage.setItem('quest_complete', 'true');

                    const complete_dialogue = new dialogue_manager(dialogue_text_element, dialogues, dialogue_sound);
                    current_dialogue = complete_dialogue;
                    complete_dialogue.start(() => {
                        dialogue_box.style.display = 'none';
                        current_dialogue = null;
                    });

                } else {
                    const dialogues = [
                        "Stupid Looking Pufferfish: help find my dog, i was last with him when i was at the jellyfish fields, just outside the city.",
                        ""
                    ];
                    const accepted_dialogue = new dialogue_manager(dialogue_text_element, dialogues, dialogue_sound);
                    current_dialogue = accepted_dialogue;
                    accepted_dialogue.start(() => {
                        dialogue_box.style.display = 'none';
                        current_dialogue = null;
                    });
                }
            } else {
                const dialogues = [
                    "Stupid Looking Pufferfish: ohhh mannn what am I going to do???",
                    "Stupid Looking Pufferfish: my dog ran away from me.",
                    "Stupid Looking Pufferfish: i took my eyes off of him for just a second and he's gone...",
                    "Stupid Looking Pufferfish: hey! you!",
                    "Stupid Looking Pufferfish: could you help me find my dog?",
                    "Glub Glub: mmm I guess so, only if you can hel-",
                    "Stupid Looking Pufferfish: PERFECT",
                    "Stupid Looking Pufferfish: help find my dog, i was last with him when i was at the jellyfish fields, just outside the city.",
                    ""
                ];

                const puffer_dialogue = new dialogue_manager(dialogue_text_element, dialogues, dialogue_sound);
                current_dialogue = puffer_dialogue;
                puffer_dialogue.start(() => {
                    dialogue_box.style.display = 'none';
                    localStorage.setItem('dog_quest_accepted', 'true');
                    if (quest_exclaim) {
                        quest_exclaim.style.display = 'none';
                        quest_pending.style.display = 'block';
                    }

                    current_dialogue = null;
                });
            }
        }
    });
});