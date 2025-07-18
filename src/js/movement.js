document.addEventListener('DOMContentLoaded', () => {
    const character = document.getElementById('character');
    const characterImage = character.querySelector('img');
    const speed = 5;

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
    let isFlipped = false;

    if (from === prev) {
        x = 0;
    } else if (from === next) {
        x = window.innerWidth;
        isFlipped = true;
        characterImage.classList.add('flipped');
    }

    const keysPressed = {
        w: false,
        a: false,
        s: false,
        d: false
    };

    const updatePosition = () => {
        const charRect = character.getBoundingClientRect();
        character.style.left = `${x - charRect.width / 2}px`;
        character.style.top = `${y - charRect.height / 2}px`;
    };

    document.addEventListener('keydown', (event) => {
        const key = event.key.toLowerCase();
        if (key in keysPressed) {
            keysPressed[key] = true;
        }
    });

    document.addEventListener('keyup', (event) => {
        const key = event.key.toLowerCase();
        if (key in keysPressed) {
            keysPressed[key] = false;
        }
    });

    function moveLoop() {
        let dx = 0;
        let dy = 0;

        if (keysPressed.w) dy -= 1;
        if (keysPressed.s) dy += 1;
        if (keysPressed.a) dx -= 1;
        if (keysPressed.d) dx += 1;

        if (dx < 0 && !isFlipped) {
            isFlipped = true;
            characterImage.classList.add('flipped');
        } else if (dx > 0 && isFlipped) {
            isFlipped = false;
            characterImage.classList.remove('flipped');
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