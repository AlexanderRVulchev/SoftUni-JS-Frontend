function solve() {
  let text = document.getElementById("text").value;
  let namingConvention = document.getElementById("naming-convention").value;
  let words = text.toLowerCase().split(" ");

  function applyNamingConvention(startWordIndex, wordsArray) {
    for (let i = startWordIndex; i < wordsArray.length; i++) {
      const symbolToCapitalize = words[i].charAt(0);
      words[i] = symbolToCapitalize.toUpperCase() + words[i].slice(1);
    }
    return words;
  }

  if (namingConvention === "Pascal Case") {
    words = applyNamingConvention(0, words);
  } else if (namingConvention === "Camel Case") {
    words = applyNamingConvention(1, words);
  } else {
    words = ["Error!"];
  }

  document.getElementById("result").textContent = words.join("");
}