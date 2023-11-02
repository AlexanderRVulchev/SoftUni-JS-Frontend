function solve(input) {
    let movies = {};
    for (const command of input) {
        if (command.includes("addMovie ")) {
            let name = command.split("addMovie ")[1];
            movies[name] = {};
            movies[name].name = name;
        } else if (command.includes(" directedBy ")){
            let [name, director] = command.split(" directedBy ");
            if (name in movies) {
                movies[name].director = director;
            }
        } else if (command.includes(" onDate ")) {
            let [name, date] = command.split(" onDate ");
            if (name in movies) {
                movies[name].date = date;
            }
        }
    }
    for (const movieName in movies) {
        if (Object.keys(movies[movieName]).length === 3) {
            console.log(JSON.stringify(movies[movieName]));
        }
    }
}