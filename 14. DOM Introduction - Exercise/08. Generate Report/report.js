function generateReport() {
    let headers = Array.from(document.querySelectorAll("table thead tr th input"));
    let contentRows = Array.from(document.querySelectorAll("table tbody tr"));
    let resultArray = [];

    for (const contentRow of contentRows) {
        let cells = Array.from(contentRow.children);
        let rowObject = {};
        for (let i = 0; i < headers.length; i++) {
            if (headers[i].checked) {
                let attributeName = headers[i].getAttribute("name");
                rowObject[attributeName] = cells[i].textContent;
            }
        }
        resultArray.push(rowObject);
    }

    let outputElement = document.getElementById("output");
    outputElement.value = JSON.stringify(resultArray);
}