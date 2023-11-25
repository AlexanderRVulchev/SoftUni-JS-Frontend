function attachEvents() {
    const baseUrl = "http://localhost:3030/jsonstore/messenger";
    const [nameInput, contentInput, sendButton, refreshButton] = document.getElementsByTagName("input");
    const messagesTextarea = document.getElementById("messages");
    
    sendButton.addEventListener("click", async () => {
        const newMessage = {
            author: nameInput.value,
            content: contentInput.value
        };
        await fetch(baseUrl, {
            method: "POST",
            body: JSON.stringify(newMessage)
        });
        nameInput.value = "";
        contentInput.value = "";
    })

    refreshButton.addEventListener("click", async () => {
        const response = await fetch(baseUrl);
        const messages = await response.json();
        let messagesToDisplay = [];
        for (const message of Object.values(messages)) {
            messagesToDisplay.push(`${message.author}: ${message.content}`);
        }
        messagesTextarea.textContent = messagesToDisplay.join("\n");
    })
}

attachEvents();
