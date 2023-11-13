function addItem() {
    const newItemText = document.getElementById("newItemText").value;

    const aElement = document.createElement("a");
    aElement.href = "#";
    aElement.textContent = "[Delete]";    
    aElement.addEventListener("click", () => {
        aElement.parentElement.remove();
    })

    const liElement = document.createElement("li");
    liElement.textContent = newItemText;
    liElement.appendChild(aElement);
    document.getElementById("items").appendChild(liElement);
}