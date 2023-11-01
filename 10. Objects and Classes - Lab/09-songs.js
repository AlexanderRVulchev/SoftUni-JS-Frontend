function solve(inputArray) {
    class Song {
        constructor(type, name, time) {
            this.type = type;
            this.name = name;
            this.time = time;
        }
    }

    let numberOfSongs = inputArray.shift();
    let typeList = inputArray.pop();
    let songs = [];

    for (const entry of inputArray) {
        let [type, name, time] = entry.split("_");
        let song = new Song(type, name, time);
        songs.push(song);
    }

    let filteredSongs = typeList === "all" ? songs : songs.filter(s => s.type === typeList);    
    filteredSongs.forEach(s => console.log(s.name));    
}