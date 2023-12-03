function solve() {
    const baseUrl = "http://localhost:3030/jsonstore/tasks/";
    let titleToEdit = "";

    const titleInput = document.getElementById("course-name");
    const typeInput = document.getElementById("course-type");
    const descriptionTextArea = document.getElementById("description");
    const teacherInput = document.getElementById("teacher-name");
    const addFormButton = document.getElementById("add-course");
    const editFormButton = document.getElementById("edit-course");
    const loadButton = document.getElementById("load-course");
    const divUl = document.getElementById("list");

    loadButton.addEventListener("click", load);
    addFormButton.addEventListener("click", add);
    editFormButton.addEventListener("click", put);


    // -- Event handlers

    async function load() {
        divUl.innerHTML = "";
        const courses = Object.values(await fetchAllCourses());

        for (const course of courses) {
            const containerDiv = buildContainerDiv(course);
            divUl.appendChild(containerDiv);
        }
        editFormButton.disabled = true;
    }

    async function add() {
        const [title, type, description, teacher] = readInput();
        clearInput();

        const data = { title, type, description, teacher };
        await fetch(baseUrl, {
            method: "POST",
            body: JSON.stringify(data)
        });
        load();
    }

    async function edit(e) {
        const containerDiv = e.currentTarget.parentElement;
        titleToEdit = containerDiv.getElementsByTagName("h2")[0].textContent;
        containerDiv.remove();

        const courseToEdit = await fetchCourseByTitle(titleToEdit);
        const [description, teacher, title, type, id] = deconstructCourseObject(courseToEdit);
        setInput(title, type, description, teacher);

        editFormButton.disabled = false;
        addFormButton.disabled = true;
    }

    async function put() {
        const [title, type, description, teacher] = readInput();
        clearInput();

        const course = await fetchCourseByTitle(titleToEdit);
        const id = course._id;

        const data = { title, type, description, teacher };
        await fetch(baseUrl + id, {
            method: "PUT",
            body: JSON.stringify(data)
        });

        load();

        editFormButton.disabled = true;
        addFormButton.disabled = false;
    }

    async function finish(e) {
        const containerDiv = e.currentTarget.parentElement;
        const titleToDelete = containerDiv.getElementsByTagName("h2")[0].textContent;

        const course = await fetchCourseByTitle(titleToDelete);
        const id = course._id;

        await fetch(baseUrl + id, {
            method: "DELETE"
        });
        load();
    }

    // -- Helper functions

    async function fetchAllCourses() {
        const response = await fetch(baseUrl);
        const courses = await response.json();
        return courses;
    }

    async function fetchCourseByTitle(title) {
        const coursesObj = Object.values(await fetchAllCourses());
        const coursesArray = Array.from(coursesObj);
        const course = coursesArray.find(c => c.title === title);
        return course;
    }
    
    function readInput() {
        const title = titleInput.value;
        const type = typeInput.value;
        const description = descriptionTextArea.value;
        const teacher = teacherInput.value;
        return [title, type, description, teacher];
    }

    function clearInput() {
        setInput("", "", "", "");
    }

    function setInput(title, type, description, teacher) {
        titleInput.value = title;
        typeInput.value = type;
        descriptionTextArea.value = description;
        teacherInput.value = teacher;
    }

    function deconstructCourseObject(courseObj) {
        const description = courseObj.description;
        const teacher = courseObj.teacher;
        const title = courseObj.title;
        const type = courseObj.type;
        const id = courseObj._id
        return [description, teacher, title, type, id];
    }

    // -- Html builders

    function buildContainerDiv(courseObj) {
        const [description, teacher, title, type, id] = deconstructCourseObject(courseObj);
        const titleH2 = buildHtmlElement("h2", title, null, null);
        const teacherH3 = buildHtmlElement("h3", teacher, null, null);
        const typeH3 = buildHtmlElement("h3", type, null, null);
        const descriptionH4 = buildHtmlElement("h4", description, null, null);
        const editButton = buildHtmlElement("button", "Edit Course", null, ["edit-btn"]);
        const finishButton = buildHtmlElement("button", "Finish Course", null, ["finish-btn"]);

        editButton.addEventListener("click", edit);
        finishButton.addEventListener("click", finish);

        const div = buildHtmlElement("div", null, null, ["container"], titleH2, teacherH3, typeH3, descriptionH4, editButton, finishButton);
        return div;
    }

    function buildHtmlElement(tag, text, id, classNames, ...children) {
        const element = document.createElement(tag);
        if (text !== null) {
            element.textContent = text;
        }
        if (id !== null) {
            element.id = id;
        }
        if (classNames !== null) {
            classNames.forEach(className => {
                element.classList.add(className);
            });
        }

        for (const child of children) {
            element.appendChild(child);
        }

        return element;
    }
}

solve();