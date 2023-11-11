function solve() {
  const inputText = document.getElementById("input").value;
  let outputElement = document.getElementById("output");
  let sentences = inputText.split(".");
  let paragraphToFillWithSentences = [];

  while (sentences.length > 0) {
    const currentSentence = sentences.shift();
    if (currentSentence.length > 1) {
      paragraphToFillWithSentences.push(currentSentence);
    }
    if (paragraphToFillWithSentences.length === 3) {
      addParagraphToTheDom();
    }
  }

  if (paragraphToFillWithSentences.length > 0) {
    addParagraphToTheDom();
  }

  function addParagraphToTheDom() {
    const paragraphToDisplay = paragraphToFillWithSentences.join(".") + ".";
      let newParagraphElement = document.createElement("p");
      newParagraphElement.innerHTML = paragraphToDisplay;
      outputElement.appendChild(newParagraphElement);
      paragraphToFillWithSentences = [];
  }
}