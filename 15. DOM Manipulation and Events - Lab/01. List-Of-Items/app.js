function addItem() {
    const newItemText = document.getElementById("newItemText").value;
    const newElement = document.createElement("li");
    newElement.textContent = newItemText;
    document.getElementById("items").appendChild(newElement);
}