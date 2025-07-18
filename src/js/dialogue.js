document.addEventListener('DOMContentLoaded', () => {
    const dialogueTextElement = document.getElementById('dialogue-text');
    const dialogues = [
        "click happy cat inside the box to advance dialogue",
        "Glub Glub: Woah what am I doing in depths of the ocean? I seemed to lost my memory. aghh It's cold, scary, and spooooky down here.",
        "Glub Glub: I don't remember anything, but I have a feeling that I MUST find Meow Meow. The issue is...",
        "Glub Glub: Who is Meow Meow?",
        "Glub Glub: What is a Meow Meow?",
        "Glub Glub: Where is Meow Meow?",
        "Glub Glub: What does Meow Meow mean to me?",
        "use \"WASD\" to move",
        ""
    ];

    let currentDialogueIndex = 0;
    let isTyping = false;

    function typeWriter(text, onComplete) {
        isTyping = true;
        let i = 0;
        dialogueTextElement.innerHTML = "";
        function typing() {
            if (i < text.length) {
                dialogueTextElement.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, 40);
            } else {
                isTyping = false;
                if (onComplete) onComplete();
            }
        }
        typing();
    }

    function showNextDialogue() {
        if (isTyping || currentDialogueIndex >= dialogues.length) {
            return;
        }
        typeWriter(dialogues[currentDialogueIndex], () => {
            currentDialogueIndex++;
        });
    }

    showNextDialogue();

    document.body.addEventListener('click', showNextDialogue);
});