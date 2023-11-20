async function getInfo() {
    const baseUrl = "http://localhost:3030/jsonstore/bus/businfo/";
    const stopId = document.getElementById("stopId").value;
    document.getElementById("stopId").value = "";
    document.getElementById("buses").innerHTML = "";
    
    try {
        const response = await fetch(baseUrl + stopId);
        await displayBusStopInformationAsync(response);
    } catch {
        document.getElementById('stopName').textContent = "Error";
    }

    async function displayBusStopInformationAsync(response) {
        const busStopInfo = await response.json();
        const busStopNameElement = document.getElementById('stopName');
        busStopNameElement.textContent = busStopInfo.name;

        addBusInfoListItemsToTheDom(busStopInfo.buses);
    }

    function addBusInfoListItemsToTheDom(buses) {
        const ul = document.getElementById("buses");
        for (const [busNumber, arrivalInMinutes] of Object.entries(buses)) {
            const text = `Bus ${busNumber} arrives in ${arrivalInMinutes} minutes`;
            const li = document.createElement("li");
            li.textContent = text;
            ul.appendChild(li);
        }
    }
}