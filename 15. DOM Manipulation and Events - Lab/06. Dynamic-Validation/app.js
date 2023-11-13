function validate() {
    const email = document.getElementById("email");
    const pattern = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "g");

    email.addEventListener("change", (e) => {
        const inputElement = e.target;
        const inputText = inputElement.value;
        const match = pattern.test(inputText);
        if (match) {
            inputElement.classList.remove("error");
        } else {
            inputElement.classList.add("error");
        }
    })
}