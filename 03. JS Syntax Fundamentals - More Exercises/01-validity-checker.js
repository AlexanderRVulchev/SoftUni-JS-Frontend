function solve(x1, y1, x2, y2) {
    
    function checkDistance(x1, y1, x2, y2) {
        let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        let status = "invalid";
        if (Number.isInteger(distance)) {
            status = "valid";
        }
    
        console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is ${status}`);
    }    

    checkDistance(x1, y1, 0, 0);
    checkDistance(x2, y2, 0, 0);
    checkDistance(x1, y1, x2, y2);
}