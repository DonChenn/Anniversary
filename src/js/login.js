function setupConfetti() {
    const confettiSettings = {
        target: 'confetti-canvas',
        max: 80,
        size: 1,
        animate: true,
        props: ['circle', 'square', 'triangle', 'line'],
        colors: [[165,104,246],[230,61,135],[0,199,228],[253,214,126]],
        clock: 10,
        rotate: true,
        width: window.innerWidth,
        height: window.innerHeight
    };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
}

function handleFailedLogin(count, messageElement) {
    if (count === 1) {
        messageElement.textContent = 'Keep Trying!';
    } else if (count === 2) {
        messageElement.textContent = 'HINT: what are our nicknames?';
    } else if (count === 3) {
        messageElement.textContent = 'HINT: Yours goes first.';
    } else if (count === 4) {
        messageElement.textContent = 'HINT: ⟩<^,«⋗ AND /ᐠ > ˕ <マ';
    } else {
        messageElement.textContent = 'bruh';
    }
}

function initializeLoginForm() {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const messageElement = document.getElementById('message');
    let attemptCount = 0;

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = usernameInput.value;
        const password = passwordInput.value;

        if (username === "glub glub" && password === "meow meow") {
            messageElement.textContent = `Entering the glub glub world...`;

            setTimeout(() => {
                document.body.classList.add('fade-out');

                setTimeout(() => {
                    window.location.href = 'welcome.html';
                }, 2000);

            }, 2000);

        } else {
            attemptCount++;
            handleFailedLogin(attemptCount, messageElement);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupConfetti();
    initializeLoginForm();
});