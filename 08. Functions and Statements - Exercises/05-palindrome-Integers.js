function solve(numsArray) {
    for (let i = 0; i < numsArray.length; i++) {
        let forwards = String(numsArray[i]);
        let backwards = "";

        for (let j = forwards.length - 1; j >= 0; j--) {
            backwards += forwards[j];
        }
        console.log(forwards === backwards);           
    }
}