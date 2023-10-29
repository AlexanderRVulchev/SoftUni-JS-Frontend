function solve(base, increment) {
    let stone = 0; 
    let marble = 0; 
    let lapis = 0;
    let gold = 0;

    let step = 1;
    while (true) {
        if (base - 2 <= 0) {
            gold += base ** 2;
            break;
        }

        stone += (base - 2) ** 2;

        if (step % 5 === 0) {
            lapis += base ** 2 - (base - 2) ** 2;
        } else {
            marble += base ** 2 - (base - 2) ** 2;
        }

        step++;
        base -= 2;
    }

    console.log(`Stone required: ${Math.ceil(stone * increment)}`);
    console.log(`Marble required: ${Math.ceil(marble * increment)}`);
    console.log(`Lapis Lazuli required: ${Math.ceil(lapis * increment)}`);
    console.log(`Gold required: ${Math.ceil(gold * increment)}`);
    console.log(`Final pyramid height: ${Math.floor(step * increment)}`);
}