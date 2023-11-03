function solve(input) {
    let words = input.toLowerCase().split(" ");
    let oddOccurencesByWord = {};      

    words.forEach(word => {
        oddOccurencesByWord[word] = 0;        
    });
    words.forEach(word => {
        oddOccurencesByWord[word] += 1;
    })

    let entries = Object.entries(oddOccurencesByWord).filter(w => w[1] % 2 === 1);
    let result = []
    for (const [key, value] of entries) {
        result.push(key);
    }
    console.log(result.join(" "));
}