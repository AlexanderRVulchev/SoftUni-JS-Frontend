function extract(elementId) {
    let content = document.getElementById(elementId).textContent;
    let pattern = /\((.+?)\)/g;
    let match = pattern.exec(content);
    let result = [];
    while (match) {
        result.push(match[1]);
        match = pattern.exec(content);
    }
    return result.join("; ")
}