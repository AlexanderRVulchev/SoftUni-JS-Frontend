function lockedProfile() {
    const profiles = Array.from(document.getElementsByClassName("profile"));

    for (const profile of profiles) {
        const userDetails = profile.getElementsByTagName("div")[0];
        const unlockedButton = profile.getElementsByTagName("input")[1];        
        const showMoreButton = profile.getElementsByTagName("button")[0];
        
        showMoreButton.addEventListener("click", () => {

            if (unlockedButton.checked) {
                if (showMoreButton.textContent === "Show more") {
                    userDetails.style.display = "block";
                    showMoreButton.textContent = "Hide it";
                } else {
                    userDetails.style.display = "none";
                    showMoreButton.textContent = "Show more";
                }
            }
        })
    }
}