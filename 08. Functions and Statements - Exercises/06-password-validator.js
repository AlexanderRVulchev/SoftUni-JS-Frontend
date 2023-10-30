function solve(password) {
    let passwordIsValid = true;
    if (password.length < 6 || password.length > 10) {
        console.log("Password must be between 6 and 10 characters");
        passwordIsValid = false;
    }
    if (!/^[A-Za-z0-9]+$/.test(password)) {
        console.log("Password must consist only of letters and digits");
        passwordIsValid = false;
    }
    if (!/\d.*\d/.test(password)) {
        console.log("Password must have at least 2 digits");
        passwordIsValid = false;
    }
    if (passwordIsValid) {
        console.log("Password is valid");
    }
}

solve('Pa$s$s');