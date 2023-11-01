function solve(peopleInfo) {
    let addressBook = {};
    for (const personInfo of peopleInfo) {
        let [name, address] = personInfo.split(":");
        addressBook[name] = address;
    }
    let entries = Object.entries(addressBook);
    for (const [key, value] of entries.sort((a, b) => a[0].localeCompare(b[0]))) {
        console.log(`${key} -> ${value}`);
    }
}