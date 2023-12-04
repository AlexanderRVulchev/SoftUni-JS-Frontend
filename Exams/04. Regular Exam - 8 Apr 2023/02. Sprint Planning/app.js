window.addEventListener('load', solve);

function solve() {
    const symbolsByOption = {
        "Feature": " &#8865",
        "Low Priority Bug": " &#9737",
        "High Priority Bug": " &#9888"
    }

    let nextIdNumber = 1;
    let totalPoints = 0;

    const taskIdInput = document.getElementById("task-id");
    const titleInput = document.getElementById("title");
    const descriptionInput = document.getElementById("description");
    const labelSelect = document.getElementById("label");
    const pointsInput = document.getElementById("points");
    const assigneeInput = document.getElementById("assignee");
    const createTaskButton = document.getElementById("create-task-btn");
    const deleteTaskButton = document.getElementById("delete-task-btn");
    const tasksSection = document.getElementById("tasks-section");
    const totalPointsP = document.getElementById("total-sprint-points");

    createTaskButton.addEventListener("click", create);
    deleteTaskButton.addEventListener("click", confirmDelete);

    
    // -- Event handlers

    function create() {
        const [title, description, label, points, assignee] = readInput();
        if (title && description && label && points && assignee) {
            const article = buildTaskArticle(title, description, label, points, assignee);
            tasksSection.appendChild(article);

            totalPoints += Number(points);
            totalPointsP.textContent = `Total Points ${totalPoints}pts`;

            clearInput();
        }
    }

    function loadDelete(e) {
        const taskArticle = e.currentTarget.parentElement.parentElement;
        const [title, description, label, points, assignee] = deconstructTaskArticle(taskArticle);

        taskIdInput.id = taskArticle.id;

        setInput(title, description, label, points, assignee);
        modifyDisabledInputAttribute(true);
        createTaskButton.disabled = true;
        deleteTaskButton.disabled = false;
    }

    function confirmDelete() {
        const idToDelete = taskIdInput.id;
        const articleToDelete = document.querySelector(`article#${idToDelete}`);

        const deconstructedArticleArray = deconstructTaskArticle(articleToDelete);
        const points = deconstructedArticleArray[3];
        totalPoints -= Number(points);
        totalPointsP.textContent = `Total Points ${totalPoints}pts`;

        articleToDelete.remove();
        clearInput();
        modifyDisabledInputAttribute(false);

        deleteTaskButton.disabled = true;
        createTaskButton.disabled = false;        
    }

    // -- Helper functions

    function readInput() {
        const title = titleInput.value;
        const description = descriptionInput.value;
        const label = labelSelect.value;
        const points = pointsInput.value;
        const assignee = assigneeInput.value;
        return [title, description, label, points, assignee];
    }

    function clearInput() {
        setInput("", "", "", "", "");
    }

    function setInput(title, description, label, points, assignee) {
        titleInput.value = title;
        descriptionInput.value = description;
        labelSelect.value = label;
        pointsInput.value = points;
        assigneeInput.value = assignee;
    }

    function deconstructTaskArticle(article) {
        const articleChildren = article.children;

        const unformattedLabelArray = articleChildren[0].textContent.split(" ");
        const unformattedPointsArray = articleChildren[3].textContent.split(" ");
        const unformattedAssignee = articleChildren[4].textContent;
        unformattedLabelArray.pop();
        unformattedPointsArray.pop();

        const label = unformattedLabelArray.join(" ");
        const title = articleChildren[1].textContent;
        const description = articleChildren[2].textContent;
        const points = unformattedPointsArray.pop();
        const assignee = unformattedAssignee.slice("Assigned to: ".length);

        return [title, description, label, points, assignee];
    }

    function modifyDisabledInputAttribute(toDisable) {
        titleInput.disabled = toDisable;
        descriptionInput.disabled = toDisable;
        labelSelect.disabled = toDisable;
        pointsInput.disabled = toDisable;
        assigneeInput.disabled = toDisable;
    }

    // -- Html builders

    function buildTaskArticle(title, description, label, points, assignee) {
        const classesByLabelOption = {
            "Feature": "feature",
            "Low Priority Bug": "low-priority",
            "High Priority Bug": "high-priority"
        };
        const labelClass = classesByLabelOption[label];

        const deleteButton = buildHtmlElement("button", "Delete", null, null);
        deleteButton.addEventListener("click", loadDelete);

        const labelDiv = buildHtmlElement("div", label, null, ["task-card-label", labelClass]);
        labelDiv.innerHTML += symbolsByOption[label];
        const titleH3 = buildHtmlElement("h3", title, null, ["task-card-title"]);
        const descriptionP = buildHtmlElement("p", description, null, ["task-card-description"]);
        const pointsDiv = buildHtmlElement("div", `Estimated at ${points} pts`, null, ["task-card-points"]);
        const assigneeDiv = buildHtmlElement("div", `Assigned to: ${assignee}`, null, ["task-card-assignee"]);
        const actionsDiv = buildHtmlElement("div", null, null, ["task-card-actions"], deleteButton);

        const article = buildHtmlElement("article", null, "task-" + nextIdNumber, ["task-card"], labelDiv, titleH3, descriptionP, pointsDiv, assigneeDiv, actionsDiv);
        nextIdNumber++;

        return article;
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