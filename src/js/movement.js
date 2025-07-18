document.addEventListener('DOMContentLoaded', () => {
    const character = document.getElementById('character');
    const character_img = character.querySelector('img');

    const norm_speed = 5;
    const sprint_spreed = 10;
    let speed = norm_speed;

    const path = window.location.pathname;
    const page_html = path.split("/").pop();
    const page = page_html.split('.')[0];

    const query_string = window.location.search;
    const url_params = new URLSearchParams(query_string);
    const from = url_params.get('from');

    let path_dict = {
        welcome: [null, "next"],
        next: ["welcome", "next2"]
    }

    const pages = path_dict[page];
    const prev = pages[0];
    const next = pages[1];

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let is_flipped = false;

    if (from === prev) {
        x = 0;
    } else if (from === next) {
        x = window.innerWidth;
        is_flipped = true;
        character_img.classList.add('flipped');
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

    const updatePosition = () => {
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

    function moveLoop() {
        if (keys_pressed.Shift) {
            speed = sprint_spreed;
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
            const diagonalSpeed = speed / Math.sqrt(2);
            x += dx * diagonalSpeed;
            y += dy * diagonalSpeed;
        } else {
            x += dx * speed;
            y += dy * speed;
        }

        updatePosition();

        if (x < 0 && prev) {
            window.location.href = `${prev}.html?from=${page}`;
            System.exit(0);
        } else if (x > window.innerWidth && next) {
            window.location.href = `${next}.html?from=${page}`;
            System.exit(0);
        }

        requestAnimationFrame(moveLoop);
    }

    updatePosition();
    moveLoop();
});
