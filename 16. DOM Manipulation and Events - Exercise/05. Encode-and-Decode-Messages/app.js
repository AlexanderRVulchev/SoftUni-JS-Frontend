function encodeAndDecodeMessages() {
    const [senderTextArea, receiverTextArea] = document.getElementsByTagName("textarea");
    const [encodeButton, decodeButton] = document.getElementsByTagName("button");

    encodeButton.addEventListener("click", () => {
        const inputText = senderTextArea.value;
        senderTextArea.value = "";
        receiverTextArea.textContent = transformMessage(inputText, 1);
    });
    decodeButton.addEventListener("click", () => {
        const decodedText = transformMessage(receiverTextArea.value, -1);
        receiverTextArea.value = decodedText;
    })

    function transformMessage(message, offset) {
        let transformedString = "";
        for (let i = 0; i < message.length; i++) {
            const newValue = message.charCodeAt(i) + Number(offset);
            transformedString += String.fromCharCode(newValue);
        }
        return transformedString;
    }
}