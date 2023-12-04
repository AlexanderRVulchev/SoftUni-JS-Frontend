function solve(input) {
    let sprint = {};
    let tasks = {
        "ToDo": 0,
        "In Progress": 0,
        "Code Review": 0,
        "Done": 0
    };

    const numberOfAssignees = Number(input.shift());

    for (let i = 0; i < numberOfAssignees; i++) {
        const tokens = input.shift().split(":");
        const [assignee, taskId, title, status, points] = tokens;

        if (!sprint[assignee]) {
            sprint[assignee] = [];
        }

        sprint[assignee].push({ taskId, title, status, points: Number(points) });
        updateTasks(status, points, true);
    }

    while (input.length > 0) {
        const [command, ...restOfTheTokens] = input.shift().split(":");

        if (command === "Add New") {
            addNew(restOfTheTokens)
        } else if (command === "Change Status") {
            changeStatus(restOfTheTokens)
        } else if (command === "Remove Task") {
            removeTask(restOfTheTokens)
        }
    }

    console.log(`ToDo: ${tasks["ToDo"]}pts`);
    console.log(`In Progress: ${tasks["In Progress"]}pts`);
    console.log(`Code Review: ${tasks["Code Review"]}pts`);
    console.log(`Done Points: ${tasks["Done"]}pts`);

    if (tasks["Done"] >= tasks["ToDo"] + tasks["In Progress"] + tasks["Code Review"]) {
        console.log("Sprint was successful!");
    } else {
        console.log("Sprint was unsuccessful...");
    }

    // -- Functions

    function addNew(tokens) {
        const [assignee, taskId, title, status, points] = tokens;

        if (!assigneeExists(assignee)) {
            return;
        }
        sprint[assignee].push({ taskId, title, status, points: Number(points) });
        updateTasks(status, points, true);
    }

    function changeStatus(tokens) {
        const [assignee, taskId, newStatus] = tokens;

        if (!assigneeExists(assignee)) {
            return;
        }

        let task = sprint[assignee].find(t => t.taskId === taskId);
        if (!task) {
            console.log(`Task with ID ${taskId} does not exist for ${assignee}!`);
            return;
        }

        updateTasks(task.status, task.points, false);
        task.status = newStatus;
        updateTasks(task.status, task.points, true);
    }

    function removeTask(tokens) {
        const [assignee, indexAsString] = tokens;
        const index = Number(indexAsString);

        if (!assigneeExists(assignee)) {
            return;
        }

        let task = sprint[assignee][index];

        if (!task) {
            console.log("Index is out of range!");
            return;
        }

        updateTasks(task.status, task.points, false);
        sprint[assignee].splice(index, 1);        
    }

    function assigneeExists(assignee) {
        if (!sprint.hasOwnProperty(assignee)) {
            console.log(`Assignee ${assignee} does not exist on the board!`);
            return false;
        } else {
            return true;
        }
    }

    function updateTasks(status, points, toAdd) {
        const pointsAsNumber = Number(points);
        tasks[status] += toAdd ? pointsAsNumber : 0 - pointsAsNumber;
    }
}