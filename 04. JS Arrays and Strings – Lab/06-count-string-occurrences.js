function solve(text, targetWord) {    
    let words = text.split(" ");
    let occurences = 0;

    words.forEach(w => {
        if (w === targetWord) {
            occurences++;
        }
    });
    
    console.log(occurences);
}