function toggle() {
    let buttonElement = document.getElementsByClassName("button")[0];
    let extraTextElement = document.getElementById("extra");
    if (buttonElement.textContent === "More") {
        extraTextElement.style.display = "block";
        buttonElement.textContent = "Less";
    } else {
        extraTextElement.style.display = "none";
        buttonElement.textContent = "More";
    }
}