function solve(peopleInfo) {
    let result = {};
    for (const info of peopleInfo) {
        let [name, phoneNumber] = info.split(" ");
        result[name] = phoneNumber;
    }
    for (const key in result) {
        console.log(`${key} -> ${result[key]}`);
    }
}

solve(['Tim 0834212554',
'Peter 0877547887',
'Bill 0896543112',
'Tim 0876566344']
);