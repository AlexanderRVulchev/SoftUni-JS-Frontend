async function solution() {
    const baseUrl = "http://localhost:3030/jsonstore/advanced/articles/";
    const mainSection = document.getElementById("main");
    mainSection.innerHTML = "";

    const articleItems = await (await fetch(baseUrl + "list")).json();

    for (const articleItem of articleItems) {
        const id = articleItem._id;
        const title = articleItem.title;

        const detailsItem = await (await fetch(baseUrl + "details/" + id)).json();
        const content = detailsItem.content;
        mainSection.innerHTML +=
        `
        <div class="accordion">
            <div class="head">
                <span>${title}</span>
                <button id="${id}" class="button">More</button>
            </div>
            <div class="extra" style="display: none">
                <p>${content}</p>
            </div>
        </div>
        `              
    }

    const buttons = Array.from(document.getElementsByTagName("button"));
    buttons.forEach(b => b.addEventListener("click", (e) => buttonClickEvent(e)));

    function buttonClickEvent(e) {
        const buttonElement = e.currentTarget;
        const accordionElement = buttonElement.parentElement.parentElement;
        const extraElement = accordionElement.children[1];

        if (buttonElement.textContent === "More") {
            extraElement.style.display = "block";
            buttonElement.textContent = "Less"
        } else {
            extraElement.style.display = "none";
            buttonElement.textContent = "More"
        }        
    }
}

solution();