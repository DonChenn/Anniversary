const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const messageElement = document.getElementById('message');

let count = 0;

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;

    if (username === "glub glub" && password === "meow meow") {
        messageElement.textContent = `Welcome, ${username}! Logging you in...`;

        setTimeout(() => {
            window.location.href = 'welcome.html';
        }, 2000);

    } else {
        count++;

        if (count === 1) {
            messageElement.textContent = 'Keep Trying!';
        }

        else if (count === 2) {
            messageElement.textContent = 'HINT: what are our nicknames?';
        }

        else if (count === 3) {
            messageElement.textContent = 'HINT: Mine goes in the password section.';
        }

        else if (count === 4) {
            messageElement.textContent = 'HINT: ⟩<^,«⋗ AND /ᐠ > ˕ <マ';
        }

        else {
            messageElement.textContent = 'bruh';
        }
    }
});