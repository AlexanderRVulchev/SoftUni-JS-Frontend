function attachEventsListeners() {
    const daysButton = document.getElementById("daysBtn");
    const hoursButton = document.getElementById("hoursBtn");
    const minutesButton = document.getElementById("minutesBtn");
    const secondsButton = document.getElementById("secondsBtn");   

    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");

    daysButton.addEventListener("click", () => displayAll(Number(days.value) * 86400));    
    hoursButton.addEventListener("click", () =>  displayAll(Number(hours.value) * 3600));    
    minutesButton.addEventListener("click", () =>  displayAll(Number(minutes.value) * 60));
    secondsButton.addEventListener("click", () => displayAll(Number(seconds.value)));

    function displayAll(inputInSeconds) {
        seconds.value = inputInSeconds;
        minutes.value = Number(seconds.value) / 60;
        hours.value = Number(minutes.value) / 60;
        days.value = Number(hours.value) / 24;
    }
}