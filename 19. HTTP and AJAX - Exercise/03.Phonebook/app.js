function attachEvents() {
    const baseUrl = "http://localhost:3030/jsonstore/phonebook/";
    const [loadButton, createButton] = document.getElementsByTagName("button");
    const [personInput, phoneInput] = document.getElementsByTagName("input");
    const phonebookUl = document.getElementById("phonebook");

    loadButton.addEventListener("click", loadContacts);
    createButton.addEventListener("click", createContact);

    async function loadContacts() {
        const response = await fetch(baseUrl);
        const phonebook = await response.json();
        phonebookUl.innerHTML = "";
        for (const entryObj of Object.values(phonebook)) {
            const li = document.createElement("li");
            li.textContent = `${entryObj.person}: ${entryObj.phone}`;
            
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.value = entryObj._id;
            deleteButton.addEventListener("click", (e) => deleteEntryHandler(e));
            li.appendChild(deleteButton);
            phonebookUl.appendChild(li);
        }
    }

    async function deleteEntryHandler(event) {        
        const id = event.currentTarget.value;
        await fetch(baseUrl + id, {
            method: "DELETE"            
        });
        await loadContacts();
    }

    async function createContact() {
        const newContact = {
            person: personInput.value,
            phone: phoneInput.value
        }
        await fetch(baseUrl, {
            method: "POST",
            body: JSON.stringify(newContact)
        });
        phoneInput.value = "";
        personInput.value = "";
        await loadContacts();
    }
}

attachEvents();