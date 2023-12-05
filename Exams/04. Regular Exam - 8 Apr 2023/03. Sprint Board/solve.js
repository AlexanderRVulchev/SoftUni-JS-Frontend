function attachEvents() {
    const baseUrl = "http://localhost:3030/jsonstore/tasks/";

    const loadBoardButton = document.getElementById("load-board-btn");
    const titleInput = document.getElementById("title");
    const descriptionInput = document.getElementById("description");
    const createTaskButton = document.getElementById("create-task-btn");
    const toDoUl = document.querySelector("#todo-section ul.task-list");
    const inProgressUl = document.querySelector("#in-progress-section ul.task-list");
    const codeReviewUl = document.querySelector("#code-review-section ul.task-list");
    const doneUl = document.querySelector("#done-section ul.task-list");

    loadBoardButton.addEventListener("click", load);
    createTaskButton.addEventListener("click", create);

    // -- Event handlers

    async function load() {
        clearBoard();
        const tasks = await fetchAllTasks();

        while (tasks.length > 0) {
            const task = tasks.shift();
            const [title, description, status, id] = deconstructTaskObject(task);
            const taskLi = buildTaskLiElement(title, description, status);

            if (status === "ToDo") {
                toDoUl.appendChild(taskLi);
            } else if (status === "In Progress") {
                inProgressUl.appendChild(taskLi);
            } else if (status === "Code Review") {
                codeReviewUl.appendChild(taskLi);
            } else if (status === "Done") {
                doneUl.appendChild(taskLi);
            }
        }

        titleInput.value = "";
        descriptionInput.value = "";
    }

    async function create() {
        const title = titleInput.value;
        const description = descriptionInput.value;

        const data = { title, description, status: "ToDo" };

        await fetch(baseUrl, {
            method: "POST",
            body: JSON.stringify(data)
        });

        titleInput.value = "";
        descriptionInput.value = "";
        await load();
    }

    async function moveTask(e) {
        const taskLi = e.currentTarget.parentElement;
        const title = taskLi.querySelector("h3").textContent;
        const task = await fetchTaskByTitle(title);

        const newStatusByOldStatus = {
            "ToDo": "In Progress",
            "In Progress": "Code Review",
            "Code Review": "Done",
            "Done": "DELETE"
        };

        const newStatus = newStatusByOldStatus[task.status];

        if (newStatus === "DELETE") {
            const id = task._id;
            await fetch(baseUrl + id, {
                method: "DELETE"
            });
        } else {
            const data = {
                description: task.description,
                status: newStatus,
                title: title
            };

            await fetch(baseUrl + task._id, {
                method: "PATCH",
                body: JSON.stringify(data)
            });
        }

        await load();
    }

    // -- Helper functions

    async function fetchAllTasks() {
        const response = await fetch(baseUrl);
        const tasksObj = await response.json();
        const tasks = Array.from(Object.values(tasksObj));
        return tasks;
    }

    async function fetchTaskByTitle(title) {
        const tasks = await fetchAllTasks()
        const task = tasks.filter(t => t.title === title)[0];
        return task;
    }

    function deconstructTaskObject(task) {
        const title = task.title;
        const status = task.status;
        const description = task.description;
        const id = task._id;
        return [title, description, status, id];
    }

    function clearBoard() {
        toDoUl.innerHTML = "";
        inProgressUl.innerHTML = "";
        codeReviewUl.innerHTML = "";
        doneUl.innerHTML = "";
    }

    // -- Html builders

    function buildTaskLiElement(title, description, status) {
        const buttonTextByStatus = {
            "ToDo": "Move to In Progress",
            "In Progress": "Move to Code Review",
            "Code Review": "Move to Done",
            "Done": "Close"
        }

        const titleH3 = buildHtmlElement("h3", title, null, null);
        const descriptionP = buildHtmlElement("p", description, null, null);
        const statusButton = buildHtmlElement("button", buttonTextByStatus[status], null, null);
        const li = buildHtmlElement("li", null, null, ["task"], titleH3, descriptionP, statusButton);

        statusButton.addEventListener("click", moveTask);
        return li;
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

attachEvents();