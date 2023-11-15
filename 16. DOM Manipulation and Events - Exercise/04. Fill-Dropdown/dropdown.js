function addItem() {
    const textBox = document.getElementById("newItemText");
    const valueBox = document.getElementById("newItemValue");
    const menu = document.getElementById("menu");

    const text = textBox.value;
    const value = valueBox.value;
    textBox.value = "";
    valueBox.value = "";

    let option = document.createElement("option");
    option.textContent = text;
    option.value = value;
    menu.appendChild(option);
}