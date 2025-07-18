document.addEventListener('DOMContentLoaded', () => {
    const slideshowContainer = document.getElementById('slideshow-container');
    const dialogueTextElement = document.getElementById('dialogue-text');
    const images = [
        'assets/art/f1.png',
        'assets/art/f2.png',
        'assets/art/f3.png',
        'assets/art/f4.png',
        'assets/art/f5.png'
    ];
    const dialogues = [
        ["Meow Meow: Wowowowowow 7 years... It feels like just yesterday we met."],
        ["Glub Glub: Happy anniversary! I can't wait to see what's in store for us this year!"],
        ["Meow Meow: WOAH what is that?! Be Careful!"],
        ["Glub Glub: HELPPP SAVE ME!!"],
        ["Glub Glub: AAHDGGJSLDahaheaghagqgda~~~~~"]
    ];

    let currentImageIndex = 0;
    let currentDialogueIndex = -1;
    let isTyping = false;

    function typeWriter(text, onComplete) {
        isTyping = true;
        let i = 0;
        dialogueTextElement.innerHTML = "";
        function typing() {
            if (i < text.length) {
                dialogueTextElement.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, 50);
            } else {
                isTyping = false;
                if (onComplete) onComplete();
            }
        }
        typing();
    }

    function showContent(imageIndex) {
        if (imageIndex < images.length) {
            slideshowContainer.style.backgroundImage = `url('${images[imageIndex]}')`;
            currentDialogueIndex = 0;
            typeWriter(dialogues[imageIndex][currentDialogueIndex]);
        } else {
            window.location.href = 'welcome.html?from=login';
        }
    }

    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    showContent(currentImageIndex);

    document.body.addEventListener('click', () => {
        if (isTyping) return;

        const currentDialogueSet = dialogues[currentImageIndex];

        if (currentDialogueIndex < currentDialogueSet.length - 1) {
            currentDialogueIndex++;
            typeWriter(currentDialogueSet[currentDialogueIndex]);
        }
        else {
            currentImageIndex++;
            if (currentImageIndex < images.length) {
                showContent(currentImageIndex);
            } else {
                setTimeout(() => {
                    document.body.classList.add('fade-out');

                    setTimeout(() => {
                        window.location.href = 'welcome.html?from=login';
                    }, 2000);

                }, 2000);
            }
        }
    });
});