document.addEventListener('DOMContentLoaded', () => {
    const dialogue_text_element = document.getElementById('dialogue-text');
    const dialogue_box = document.getElementById('dialogue-box');
    const dialogue_sound = document.getElementById('dialogue-sound');
    const quest_exclaim = document.getElementById('quest_icon');
    const quest_pending = document.getElementById('quest_pending_icon');
    const note_overlay = document.getElementById('note-overlay');
    const note_open_image = document.getElementById('note-open'); // Get reference to the <img> element
    const note_text_element = document.getElementById('note-text'); // Get reference to the <p> element for note text
    const character_element = document.getElementById('character'); // Get the character element to get its position

    let current_dialogue = null;
    let note_current_state = 0;

    note_overlay.style.display = 'none';
    note_text_element.style.display = 'none';

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

    document.addEventListener('keydown', (event) => {
        if (event.code !== 'Space') {
            return;
        }

        let x = 0;
        let y = 0;
        if (character_element) {
            const char_rect = character_element.getBoundingClientRect();
            x = char_rect.left + char_rect.width / 2;
            y = char_rect.top + char_rect.height / 2;
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

        if (is_near_bottle) {
            if (note_current_state === 0) {
                note_overlay.style.display = 'flex';
                note_open_image.src = 'assets/sprites/closed_letter.png';
                note_text_element.style.display = 'none';
                note_current_state = 1;
            } else if (note_current_state === 1) {
                note_open_image.src = 'assets/sprites/open_letter.png';
                note_text_element.style.display = 'block';
                note_current_state = 2;
            } else if (note_current_state === 2) {
                note_overlay.style.display = 'none';
                note_text_element.style.display = 'none';
                note_open_image.src = '';
                note_current_state = 0;
            }
            return;
        } else {
            if (note_current_state !== 0) {
                note_overlay.style.display = 'none';
                note_text_element.style.display = 'none';
                note_open_image.src = '';
                note_current_state = 0;
                return;
            }
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