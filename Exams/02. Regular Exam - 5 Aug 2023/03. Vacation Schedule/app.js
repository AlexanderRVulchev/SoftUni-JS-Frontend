function onLoad() {
    const baseUrl = "http://localhost:3030/jsonstore/tasks/";
    let idToEdit = "";

    const nameInput = document.getElementById("name");
    const daysInput = document.getElementById("num-days");
    const dateInput = document.getElementById("from-date");
    const addButton = document.getElementById("add-vacation");
    const editButton = document.getElementById("edit-vacation");
    const loadButton = document.getElementById("load-vacations");
    const listDiv = document.getElementById("list");

    listDiv.innerHTML = "";

    loadButton.addEventListener("click", loadVacations);
    addButton.addEventListener("click", addVacation);
    editButton.addEventListener("click", editVacation);

    // -- Event handlers

    async function loadVacations() {        
        const vacations = await fetchAllVacations();

        editButton.disabled = true;
        listDiv.innerHTML = "";

        for (const vacation of Object.values(vacations)) {
            const containerDiv = buildContainerDiv(vacation);
            listDiv.appendChild(containerDiv);
        }
    }

    async function addVacation() {
        [name, date, days] = getInput();

        const data = { name, date, days, };

        clearInput();

        await fetch(baseUrl, {
            method: "POST",
            body: JSON.stringify(data)
        });

        loadVacations();
    }

    async function changeVacation(e) {
        const vacationElement = e.currentTarget.parentElement;
        const nameH2 = vacationElement.getElementsByTagName("h2")[0];

        const vacations = await fetchAllVacations();
        const vacation = Object.values(vacations).find(v => v.name === nameH2.textContent);

        idToEdit = vacation._id;
        const name = vacation.name;
        const date = vacation.date;
        const days = vacation.days;
        setInput(name, date, days);

        listDiv.removeChild(vacationElement);

        editButton.disabled = false;
        addButton.disabled = true;
    }

    function editVacation() {
        [name, date, days] = getInput();
        const data = { name, date, days, _id: idToEdit };

        fetch(baseUrl + idToEdit, {
            method: "PUT",
            body: JSON.stringify(data)
        })
        .then(clearInput())
        .then(loadVacations())
        .then(() => {
            editButton.disabled = true;
            addButton.disabled = false;
        })     
    }

    async function doneVacation(e) {
        const vacationElement = e.currentTarget.parentElement;
        const nameH2 = vacationElement.getElementsByTagName("h2")[0];
        
        const vacations = await fetchAllVacations();
        const vacation = Object.values(vacations).find(v => v.name === nameH2.textContent);
        const idToDelete = vacation._id;

        await fetch(baseUrl + idToDelete, {
            method: "DELETE"
        });

        loadVacations();
    }

    // -- Helper functions

    async function fetchAllVacations() {
        const response = await fetch(baseUrl);
        const vacations = await response.json();
        return vacations;
    }

    function getInput() {
        const name = nameInput.value;
        const date = dateInput.value;
        const days = daysInput.value;
        return [name, date, days];
    }

    function setInput(name, date, days) {
        nameInput.value = name;
        dateInput.value = date;
        daysInput.value = days;
    }

    function clearInput() {
        nameInput.value = "";
        dateInput.value = "";
        daysInput.value = "";
    }

    // -- Html builders

    function buildContainerDiv(vacation) {
        const nameH2 = buildHtmlElement("h2", vacation.name, null, null);
        const dateH3 = buildHtmlElement("h3", vacation.date, null, null);
        const daysH3 = buildHtmlElement("h3", vacation.days, null, null);
        const changeButton = buildHtmlElement("button", "Change", null, "change-btn");
        const doneButton = buildHtmlElement("button", "Done", null, "done-btn");

        changeButton.addEventListener("click", changeVacation);
        doneButton.addEventListener("click", doneVacation);

        return buildHtmlElement("div", null, null, "container", nameH2, dateH3, daysH3, changeButton, doneButton);
    }

    function buildHtmlElement(tag, text, id, className, ...children) {
        const element = document.createElement(tag);
        if (text !== null) {
            element.textContent = text;
        }
        if (id !== null) {
            element.id = id;
        }
        if (className !== null) {
            element.classList.add(className);
        }

        for (const child of children) {
            element.appendChild(child);
        }

        return element;
    }
}

onLoad();