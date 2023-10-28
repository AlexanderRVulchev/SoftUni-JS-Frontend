function solve(inputWordsString, text) {
    let words = inputWordsString.split(", ");

    words.forEach(word => {
        text = text.replace("*".repeat(word.length), word);        
    });

    console.log(text);
}

solve('great, learning', 'softuni is ***** place for ******** new programming languages');