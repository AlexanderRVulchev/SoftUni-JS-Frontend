function attachEvents() {
    const baseUrl = "http://localhost:3030/jsonstore/forecaster/";
    const getWeatherButton = document.getElementById("submit");
    const locationInput = document.getElementById("location");
    const forecastDiv = document.getElementById("forecast");
    const currentDiv = document.getElementById("current");
    const upcomingDiv = document.getElementById("upcoming");
    let locationFullName = "";

    getWeatherButton.addEventListener("click", async () => {
        const locationName = locationInput.value;
        forecastDiv.style.display = "block";
        currentDiv.innerHTML = '<div class="label">Current conditions</div>';
        upcomingDiv.innerHTML = '<div class="label">Three-day forecast</div>';

        try {
            const locationCode = await getLocationCode(locationName);
            const currentConditions = await getCurrentConditions(locationCode);
            const upcomingForecast = await getUpcomingForecast(locationCode);
            visualizeCurrentConditions(currentConditions);
            visualizeUpcomingForecast(upcomingForecast);
        } catch {
            currentDiv.textContent = "Error";            
        }
    })

    async function getLocationCode(locationName) {
        const response = await fetch(baseUrl + "locations");
        const locationsArray = await response.json();
        const location = locationsArray.find(x => x.name === locationName);
        return location.code;
    }

    async function getCurrentConditions(locationCode) {
        const response = await fetch(baseUrl + "today/" + locationCode);
        const currentForecastObj = await response.json();
        locationFullName = currentForecastObj.name;
        return currentForecastObj.forecast;
    }

    async function getUpcomingForecast(locationCode) {
        const response = await fetch(baseUrl + "upcoming/" + locationCode);
        const upcomingForecastObj = await response.json();
        return upcomingForecastObj.forecast;
    }

    function appendNestedSpan(parentElement, spanText) {
        const span = document.createElement("span");
        span.innerHTML = spanText;
        span.classList.add("forecast-data");
        parentElement.appendChild(span);
        return parentElement;
    }

    function appendNestedSymbolByCondition(parentElement, condition) {
        const symbolsByConditionChart = {
            "Sunny": "&#x2600",
            "Partly sunny": "&#x26C5",
            "Overcast": "&#x2601",
            "Rain": "&#x2614",
        }
        const span = document.createElement("span");
        span.classList.add("symbol");
        span.innerHTML = symbolsByConditionChart[condition];
        parentElement.appendChild(span);
        return parentElement;
    }

    function visualizeCurrentConditions(currentConditions) {
        const condition = currentConditions.condition;
        const low = currentConditions.low;
        const high = currentConditions.high;

        let forecastsDiv = document.createElement("div");
        forecastsDiv.classList.add("forecasts");
        forecastsDiv = appendNestedSymbolByCondition(forecastsDiv, condition);

        let conditionSpan = document.createElement("span");
        conditionSpan.classList.add("condition");
        conditionSpan = appendNestedSpan(conditionSpan, locationFullName);
        conditionSpan = appendNestedSpan(conditionSpan, low + "&#176/" + high + "&#176");
        conditionSpan = appendNestedSpan(conditionSpan, condition);

        forecastsDiv.appendChild(conditionSpan);
        currentDiv.appendChild(forecastsDiv);
    }

    function visualizeUpcomingForecast(upcomingForecast) {
        const forecastInfoDiv = document.createElement("div");
        forecastInfoDiv.classList.add("forecast-info");
        for (let i = 0; i < upcomingForecast.length; i++) {
            const upcomingDayForecastSpan = createUpcomingDayForecastSpan(upcomingForecast[i]);
            forecastInfoDiv.appendChild(upcomingDayForecastSpan);
        }
        upcomingDiv.appendChild(forecastInfoDiv);
    }

    function createUpcomingDayForecastSpan(forecast) {
        const condition = forecast.condition;
        const low = forecast.low;
        const high = forecast.high;

        let upcomingSpan = document.createElement("span");
        upcomingSpan.classList.add("upcoming");
        upcomingSpan = appendNestedSymbolByCondition(upcomingSpan, condition);
        upcomingSpan = appendNestedSpan(upcomingSpan, low + "&#176/" + high + "&#176");
        upcomingSpan = appendNestedSpan(upcomingSpan, condition);
        return upcomingSpan;
    }
}

attachEvents();