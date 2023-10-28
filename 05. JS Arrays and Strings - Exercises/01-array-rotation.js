function solve(array, rotations) {
    for (let i = 0; i < rotations; i++) {        
        const rotatedElement = array.shift();
        array.push(rotatedElement);      
    }
    console.log(array.join(" "));
}