function onLoad() {
    const baseUrl = "http://localhost:3030/jsonstore/tasks/";
    let selectedIdForEdit = "";

    const loadHistoryButton = document.getElementById("load-history");
    const listDiv = document.getElementById("list");
    const addWeatherButton = document.getElementById("add-weather");
    const editWeatherButton = document.getElementById("edit-weather");
    const locationInput = document.getElementById("location");
    const temperatureInput = document.getElementById("temperature");
    const dateInput = document.getElementById("date");

    loadHistoryButton.addEventListener("click", loadHistory);
    addWeatherButton.addEventListener("click", addWeather);
    editWeatherButton.addEventListener("click", editWeather);

    // -- Event handlers

    async function loadHistory() {
        const response = await fetch(baseUrl);
        const records = await response.json();
        listDiv.innerHTML = "";

        for (const record of Object.values(records)) {
            listDiv.appendChild(buildRecordItem(record.date, record.location, record.temperature, record._id));
        }
    }

    async function addWeather() {
        const location = locationInput.value;
        const temperature = temperatureInput.value;
        const date = dateInput.value;
        resetInput();

        const data = { location, temperature, date };

        await fetch(baseUrl, {
            method: "POST",
            body: JSON.stringify(data)
        });      

        await loadHistory();
    }

    function changeRecord(e) {
        selectedIdForEdit = e.currentTarget.id;
        const containerDiv = e.currentTarget.parentElement.parentElement;
        const recordChildrenElements = Array.from(containerDiv.children);

        const location = recordChildrenElements[0].textContent;
        const date = recordChildrenElements[1].textContent;
        const temperature = recordChildrenElements[2].textContent;

        containerDiv.remove();

        locationInput.value = location;
        dateInput.value = date;
        temperatureInput.value = temperature;

        editWeatherButton.disabled = false;
        addWeatherButton.disabled = true;
    }

    async function editWeather(e) {
        const location = locationInput.value;
        const temperature = temperatureInput.value;
        const date = dateInput.value;
        
        resetInput();

        const data = { location, temperature, date, _id: selectedIdForEdit };

        await fetch(baseUrl + selectedIdForEdit, {
            method: "PUT",
            body: JSON.stringify(data)
        });

        await loadHistory();

        editWeatherButton.disabled = true;
        addWeatherButton.disabled = false;
    }

    async function deleteRecord(e) {
        idToDelete = e.currentTarget.id;

        await fetch(baseUrl + idToDelete, {
            method: "DELETE"
        })

        await loadHistory();
    }

    function resetInput() {
        locationInput.value = "";
        temperatureInput.value = "";
        dateInput.value = "";
    }

    // -- Html builders

    function buildRecordItem(date, location, temperature, id) {
        const cityH2 = buildHtmlElement("h2", location, null, null);
        const dateH3 = buildHtmlElement("h3", date, null, null);
        const temperatureH3 = buildHtmlElement("h3", temperature, "celsius", null);

        const buttonChange = buildHtmlElement("button", "Change", id, "change-btn");
        const buttonDelete = buildHtmlElement("button", "Delete", id, "delete-btn");
        const buttonsDiv = buildHtmlElement("div", null, null, "buttons-container", buttonChange, buttonDelete);

        const containerDiv = buildHtmlElement("div", null, null, "container", cityH2, dateH3, temperatureH3, buttonsDiv);

        buttonChange.addEventListener("click", changeRecord);
        buttonDelete.addEventListener("click", deleteRecord);

        return containerDiv;
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