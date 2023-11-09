function extractText() {
    let liElements = Array.from(document.getElementById('items').children);
    let textOutput = [];
    for (const liElement of liElements) {
        textOutput.push(liElement.textContent);
    }
    let textarea = document.getElementById("result");
    textarea.textContent = textOutput.join("\n");
}