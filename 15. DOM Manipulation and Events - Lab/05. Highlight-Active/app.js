function focused() {
    const inputElements = Array.from(document.getElementsByTagName("input"));

    inputElements.forEach(el => {
        el.addEventListener("focus", (e) => {
            let parent = e.target.parentElement;
            parent.classList.add("focused");
        })
    });
    inputElements.forEach(el => {
        el.addEventListener("blur", (e) => {
            let parent = e.target.parentElement;
            parent.classList.remove("focused");
        })
    })
}