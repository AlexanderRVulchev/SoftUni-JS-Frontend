function solve() {
    const tableElement = document.getElementsByTagName("table")[0];
    const outputElement = document.getElementById("check").children[0];
    const [checkButton, clearButton]  = document.getElementsByTagName("button");
    const inputArray = Array.from(document.getElementsByTagName("input"));    

    // If we use just numbers 1, 2 and 3, the only viable sum ot each row and column is 6.
    const requiredSum = 6; 
    const checker = (x1, x2, x3, noMismatchFound) => x1 + x2 + x3 === requiredSum && noMismatchFound;

    checkButton.addEventListener("click", () => {
        let nums = inputArray.map(x => Number(x.value));
        let noMismatchFound = true;

        noMismatchFound = checker(nums[0], nums[1], nums[2], noMismatchFound);
        noMismatchFound = checker(nums[3], nums[4], nums[5], noMismatchFound);
        noMismatchFound = checker(nums[6], nums[7], nums[8], noMismatchFound);
        noMismatchFound = checker(nums[0], nums[3], nums[6], noMismatchFound);
        noMismatchFound = checker(nums[1], nums[4], nums[7], noMismatchFound);
        noMismatchFound = checker(nums[2], nums[5], nums[8], noMismatchFound);
    
        if (noMismatchFound) {
            tableElement.style.border = "2px solid green";
            outputElement.style.color = "green";
            outputElement.textContent = "You solve it! Congratulations!";
        } else {
            tableElement.style.border = "2px solid red";
            outputElement.style.color = "red";
            outputElement.textContent = "NOP! You are not done yet...";
        }
    })

    clearButton.addEventListener("click", () => {
        for (const cell of inputArray) {
            cell.value = "";
        }
        tableElement.style.border = "none";
        outputElement.textContent = "";
    })
}