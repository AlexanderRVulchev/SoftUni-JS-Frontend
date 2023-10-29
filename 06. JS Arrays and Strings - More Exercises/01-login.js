function solve(input) {
    let username = input[0];
    let password = "";
    for (let i = username.length - 1; i >= 0; i--) {
        password += username[i];
    }

    for (let i = 1; i < input.length; i++) {
        if (input[i] === password) {
            console.log(`User ${username} logged in.`);
            break;
        } else {
            if (i === 4) {
                console.log(`User ${username} blocked!`);
                break;
            }
            console.log(`Incorrect password. Try again.`);
        }        
    }
}

solve(['sunny','rainy','cloudy','sunny','not sunny']);