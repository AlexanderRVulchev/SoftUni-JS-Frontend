function solve() {
    let selectMenuElement = document.getElementById("selectMenuTo");
    let buttonElement = document.getElementsByTagName("button")[0];
    let resultElement = document.getElementById("result");

    const createOptionElement = (name, value) => {
        let option = document.createElement("option");
        option.text = name;
        option.value = value;
        return option;
    }    

    selectMenuElement.appendChild(createOptionElement("Binary", "binary"));
    selectMenuElement.appendChild(createOptionElement("Hexadecimal", "hexadecimal"));

    buttonElement.addEventListener("click", () => {
        let numberToConvert = Number(document.getElementById("input").value);
        let convertBase = selectMenuElement.value === "binary" ? 2 : 16;
        resultElement.value = numberToConvert.toString(convertBase).toUpperCase();
    })
}