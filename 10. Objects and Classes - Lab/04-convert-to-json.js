function solve(name, lastName, hairColor) {
    const obj = {
        name,
        lastName,
        hairColor
    };
    const json = JSON.stringify(obj);
    console.log(json);
}

solve('George', 'Jones', 'Brown');