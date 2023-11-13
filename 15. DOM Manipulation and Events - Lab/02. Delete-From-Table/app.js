function deleteByEmail() {
    const emailToSearchFor = document.getElementsByName("email")[0].value;
    const resultElement = document.getElementById("result");

    const emails = Array.from(document.querySelectorAll("tbody tr td:last-child"));
    const emailToDelete = emails.find(e => e.textContent === emailToSearchFor);

    if (emailToDelete) {
        emailToDelete.parentElement.remove();
        resultElement.textContent = "Deleted.";
    } else {
        resultElement.textContent = "Not found.";
    }
}