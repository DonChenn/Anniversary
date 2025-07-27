document.addEventListener('DOMContentLoaded', () => {
    const dialogue_text_element = document.getElementById('dialogue-text');
    const dialogue_box = document.getElementById('dialogue-box');
    const dialogue_sound = document.getElementById('dialogue-sound');
    const quest_exclaim = document.getElementById('quest_icon');
    const quest_pending = document.getElementById('quest_pending_icon');
    let current_dialogue = null;

    if (localStorage.getItem('catfish_quest_accepted') === 'true') {
        quest_exclaim.style.display = 'none';
        quest_pending.style.display = 'block';
    } else {
        quest_exclaim.style.display = 'block';
        quest_pending.style.display = 'none';
    }

    if (localStorage.getItem('catfish_quest_complete')) {
        quest_pending.style.display = 'none';
    }

    document.body.addEventListener('click', () => {
        if (current_dialogue) {
            current_dialogue.show_next_dialogue();
        }
    });

    if (localStorage.getItem('ship_seen_intro') !== 'true') {
        const dialogues = [
            "Glub Glub: i don't think that's Meow Meow...",
            "Glub Glub: lemme go talk to him to see if he knows how to get back home",
            "Glub Glub: i better move quickly before the sharks eat me.",
            ""
        ];

        const dialogue_manager_instance = new dialogue_manager(dialogue_text_element, dialogues, dialogue_sound);
        current_dialogue = dialogue_manager_instance;
        dialogue_manager_instance.start(() => {
            dialogue_box.style.display = 'none';
            localStorage.setItem('ship_seen_intro', 'true');
            current_dialogue = null;
        });

    } else {
        document.getElementById('dialogue-box').style.display = 'none';
    }

    let is_note_visible = false;

    if (is_note_visible) {
        note_overlay.style.display = 'none';
        is_note_visible = false;
        return;
    }

    document.addEventListener('keydown', (event) => {
        if (event.code !== 'Space') {
            return;
        }

        if (is_note_visible) {
            note_overlay.style.display = 'none';
            is_note_visible = false;
            return;
        }

        const bottle_x = window.innerWidth / 2.2;
        const bottle_y = window.innerHeight / 1.6;
        const interaction_radius = 75;

        const catfish_x = window.innerWidth / 3.7;
        const catfish_y = window.innerHeight / 1.3;

        const is_near_bottle = Math.abs(x - bottle_x) < interaction_radius &&
            Math.abs(y - bottle_y) < interaction_radius;

        const is_near_catfish = Math.abs(x - catfish_x) < interaction_radius &&
            Math.abs(y - catfish_y) < interaction_radius;

        if (is_near_bottle && localStorage.getItem('catfish_quest_complete')) {
            note_overlay.style.display = 'flex';
            is_note_visible = true;
        }

        if (is_near_catfish) {
            dialogue_box.style.display = 'block';

            if (localStorage.getItem('catfish_quest_accepted') === 'true') {
                if (localStorage.getItem('fashion_show_won')) {
                    const dialogues = [
                        "Finneas the Catfishing Catfish: thank you so much",
                        "Finneas the Catfishing Catfish: heres the screw to open up the bottl",
                        "Finneas the Catfishing Catfish: its all yours :3",
                        ""
                    ];
                    quest_pending.style.display = 'none';
                    localStorage.setItem('catfish_quest_complete', 'true');

                    const complete_dialogue = new dialogue_manager(dialogue_text_element, dialogues, dialogue_sound);
                    current_dialogue = complete_dialogue;
                    complete_dialogue.start(() => {
                        dialogue_box.style.display = 'none';
                        current_dialogue = null;
                    });

                } else {
                    const dialogues = [
                        "Catfishing Catfish: go to the city to participate in the Fashion Gala for me.",
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
                    "Glub Glub: ...excuse me?",
                    "Glub Glub: are you... a cat?",
                    "Catfishing Catfish: a… a CAT? Darling, please. The nerve. Does this face scream “common land mammal” to you?",
                    "Catfishing Catfish: the sheer, unmitigated… oh, what’s the use (whiskers droop)",
                    "Catfishing Catfish: it’s all a lie. a beautiful, shimmering lie. I’m a fraud",
                    "Glub Glub: so you're not a cat?",
                    "Glub Glub: this Stupid Looking Pufferfish was so sure that a cat with really nice whiskers was waiting at the bottom of the ocean",
                    "Catfishing Catfish: Puffy! that blabbering bubble! he must have seen my entry photo for the annual Deep Sea Fashion Gala!",
                    "Catfishing Catfish: i may have… enhanced my look. Used a kelp filter. Maybe accentuated my whiskers to a degree that could be perceived as… feline",
                    "Catfishing Catfish: It’s called CATFISHING, sweetie. It’s art",
                    "Catfishing Catfish: An art that has RUINED ME!",
                    "Catfishing Catfish: And now the Gala is about to start and I can’t go! They’re all expecting Finneas, the Feline of the Abyss",
                    "Glub Glub: (whats that glimmering glass bottle, sealed with a cork. There’s a piece of paper inside)",
                    "Glub Glub: (that handwriting... its similar to Meow Meow!)",
                    "Glub Glub: hey that bottle! where'd you get that?",
                    "Finneas the Catfishing Catfish: oh, that old thing? It just washed down here a few days ago",
                    "Finneas the Catfishing Catfish: with your excellent colors and physique, go to the Fashion Gala for me and its all yours",
                    ""
                ];

                const catfish_dialogue = new dialogue_manager(dialogue_text_element, dialogues, dialogue_sound);
                current_dialogue = catfish_dialogue;
                catfish_dialogue.start(() => {
                    dialogue_box.style.display = 'none';
                    localStorage.setItem('catfish_quest_accepted', 'true');
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
