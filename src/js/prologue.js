document.addEventListener('DOMContentLoaded', () => {
    const slideshow_container = document.getElementById('slideshow-container');
    const dialogue_text_element = document.getElementById('dialogue-text');
    const dialogue_sound = document.getElementById('dialogue-sound');
    const background_music = document.getElementById('background-music');
    const whirlpool_effect = document.getElementById('whirlpool-effect');

    const images = [
        'assets/art/f1.png', 'assets/art/f2.png', 'assets/art/f3.png',
        'assets/art/f4.png', 'assets/art/f5.png', 'assets/art/f6.png'
    ];
    const dialogues = [
        ["Click happy cat inside the box to advance dialogue"],
        ["Meow Meow: Wowowowowow 7 years... It feels like just yesterday we met."],
        ["Glub Glub: Happy anniversary! I can't wait to see what's in store for us this year!"],
        ["Meow Meow: WOAH what is that?! Be Careful!"],
        ["Glub Glub: HELPPP SAVE ME!!"],
        ["Glub Glub: AAHDGGJSLDahaheaghagqgda~~~~~"]
    ];

    let current_image_index = 0;
    let music_started = false;

    let dialogue_manager_instance = new dialogue_manager(dialogue_text_element, dialogues[0], dialogue_sound);

    function show_content(image_index) {
        if (image_index < images.length) {
            if (image_index === 4) {
                background_music.pause();
                whirlpool_effect.play();
            }
            slideshow_container.style.backgroundImage = `url('${images[image_index]}')`;
            dialogue_manager_instance = new dialogue_manager(dialogue_text_element, dialogues[image_index], dialogue_sound);
            dialogue_manager_instance.start();
        } else {
            setTimeout(() => {
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = 'spawn.html?from=login';
                }, 2000);
            }, 2000);
        }
    }

    images.forEach(src => { const img = new Image(); img.src = src; });

    show_content(current_image_index);

    document.body.addEventListener('click', () => {
        if (!music_started) {
            background_music.play();
            music_started = true;
        }

        if (dialogue_manager_instance.is_typing || dialogue_manager_instance.current_dialogue_index < dialogue_manager_instance.dialogues.length) {
            dialogue_manager_instance.show_next_dialogue();
        } else {
            current_image_index++;
            show_content(current_image_index);
        }
    });
});