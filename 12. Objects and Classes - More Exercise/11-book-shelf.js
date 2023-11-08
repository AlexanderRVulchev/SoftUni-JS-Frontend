function solve(inputArray) {
    let shelves = {};
    for (const line of inputArray) {
        if (line.includes(" -> ")) {
            let [shelfId, genre] = line.split(" -> ");
            if (!shelves.hasOwnProperty(shelfId)) {
                shelves[shelfId] = {
                    genre: genre,
                    books: []
                };
            }
        } else {
            let [bookInfo, bookGenre] = line.split(", ");
            for (const [shelfId, shelfEntry] of Object.entries(shelves)) {
                if (shelfEntry.genre === bookGenre) {
                    shelfEntry.books.push(bookInfo);
                    break;
                }
            }
        }
    }

    let sortedShelfEntries = Object.entries(shelves).sort((a, b) => b[1].books.length - a[1].books.length);
    for (const [shelfId, shelfEntry] of sortedShelfEntries) {
        console.log(`${shelfId} ${shelfEntry.genre}: ${shelfEntry.books.length}`);
        shelfEntry.books.sort();
        for (const bookInfo of shelfEntry.books) {
            console.log(`--> ${bookInfo}`);
        }
    }
}