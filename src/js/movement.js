let x = window.innerWidth / 2;
let y = window.innerHeight / 2;

document.addEventListener('DOMContentLoaded', () => {
    const character = document.getElementById('character');
    const character_img = character.querySelector('img');

    const norm_speed = 5;
    const sprint_speed = 10;
    let speed = norm_speed;

    const path = window.location.pathname;
    const page_html = path.split("/").pop();
    const page = page_html.split('.')[0];

    const query_string = window.location.search;
    const url_params = new URLSearchParams(query_string);
    const from = url_params.get('from');

    let path_dict = {
        spawn: [null, "kelp_forest", null, null],
        kelp_forest:["spawn", "zzz", null, null],
        zzz: ["kelp_forest", "jellyfish_fields", "wallace", "crevice"],
        crevice: [null, null, "zzz", "sunken_ship"],
        sunken_ship: [null, null, "crevice", null],
        jellyfish_fields: ["zzz", null, null, "hydrothermal_vents"],
        hydrothermal_vents: [null, "crystal_crab_cave", "jellyfish_fields", null],
        crystal_crab_cave: ["hydrothermal_vents", null, null, null],
        wallace: [null, null, "home", "zzz"],
        home: [null, null, null, "wallace"]
    }

    const pages = path_dict[page];
    const left = pages[0];
    const right = pages[1];
    const up = pages[2];
    const down = pages[3];

    let is_flipped = false;

    if (from === left) {
        x = 0;
    } else if (from === right) {
        x = window.innerWidth;
        is_flipped = true;
        character_img.classList.add('flipped');
    } else if (from === up){
        y = 0;
    } else if (from === down) {
        y = window.innerHeight;
    } else if (from === "login") {
        x = window.innerWidth / 3;
        y = window.innerHeight / 1.4;
    }

    const keys_pressed = {
        w: false,
        a: false,
        s: false,
        d: false,
        Shift: false
    };

    const update_position = () => {
        const char_rect = character.getBoundingClientRect();
        character.style.left = `${x - char_rect.width / 2}px`;
        character.style.top = `${y - char_rect.height / 2}px`;
    };

    document.addEventListener('keydown', (event) => {
        const key = event.key;
        if (key === 'Shift') {
            keys_pressed.Shift = true;
        } else if (key.toLowerCase() in keys_pressed) {
            keys_pressed[key.toLowerCase()] = true;
        }
    });

    document.addEventListener('keyup', (event) => {
        const key = event.key;
        if (key === 'Shift') {
            keys_pressed.Shift = false;
        } else if (key.toLowerCase() in keys_pressed) {
            keys_pressed[key.toLowerCase()] = false;
        }
    });

    function move_loop() {
        if (keys_pressed.Shift) {
            speed = sprint_speed;
        } else {
            speed = norm_speed;
        }

        let dx = 0;
        let dy = 0;

        if (keys_pressed.w) dy -= 1;
        if (keys_pressed.s) dy += 1;
        if (keys_pressed.a) dx -= 1;
        if (keys_pressed.d) dx += 1;

        if (dx < 0 && !is_flipped) {
            is_flipped = true;
            character_img.classList.add('flipped');
        } else if (dx > 0 && is_flipped) {
            is_flipped = false;
            character_img.classList.remove('flipped');
        }

        if (dx !== 0 && dy !== 0) {
            const diagonal_speed = speed / Math.sqrt(2);
            x += dx * diagonal_speed;
            y += dy * diagonal_speed;
        } else {
            x += dx * speed;
            y += dy * speed;
        }

        update_position();

        if (x < 0 && left) {
            window.location.href = `${left}.html?from=${page}`;
            System.exit(0);
        } else if (x > window.innerWidth && right) {
            window.location.href = `${right}.html?from=${page}`;
            System.exit(0);
        } else if (y < 0 && up) {
            window.location.href = `${up}.html?from=${page}`;
            System.exit(0);
        } else if (y > window.innerHeight && down) {
            window.location.href = `${down}.html?from=${page}`;
            System.exit(0);
        }

        requestAnimationFrame(move_loop);
    }

    update_position();
    move_loop();
});
