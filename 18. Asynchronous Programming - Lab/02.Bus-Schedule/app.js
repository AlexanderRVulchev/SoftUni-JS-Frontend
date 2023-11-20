function solve() {
    const baseUrl = "http://localhost:3030/jsonstore/bus/schedule/";
    const infoDisplayBox = document.getElementsByClassName("info")[0];
    const departButton = document.getElementById("depart");
    const arriveButton = document.getElementById("arrive");

    let nextStopId = "depot";
    let nextStopName = "Depot";

    async function depart() {
        try {
            const response = await fetch(baseUrl + nextStopId);
            const stopInfo = await response.json();
            infoDisplayBox.textContent = `Next stop ${stopInfo.name}`;
            nextStopId = stopInfo.next;
            nextStopName = stopInfo.name;
            departButton.disabled = true;
            arriveButton.disabled = false;
        } catch {
            departButton.disabled = true;
            infoDisplayBox.textContent = "Error";
        };
    }

    function arrive() {
        infoDisplayBox.textContent = `Arriving at ${nextStopName}`;
        departButton.disabled = false;
        arriveButton.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();