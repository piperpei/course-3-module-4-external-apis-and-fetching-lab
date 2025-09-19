// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

const fetchButton = document.getElementById("fetch-alerts"); 
const stateInput = document.getElementById("state-input"); 
const alertsDisplay = document.getElementById("alerts-display"); 
const errorMessage = document.getElementById("error-message"); 

async function fetchWeatherAlerts(state) {
    try {
        alertsDisplay.innerHTML = ""; 
        errorMessage.textContent = ""; 
        errorMessage.classList.add("hidden"); 

        if (!state || !/^[A-Z]{2}$/.test(state)) {
            throw new Error("Please enter a valid 2-letter state abbreviation (e.g., MN).");
        }

        const response = await fetch(`${weatherApi}${state}`); 
        if (!response.ok) throw new Error(`API request failed with status ${response.status}`);

        const data = await response.json(); 
        displayAlerts(data, state); 

        stateInput.value = "";
    } catch (error) {
        showError(error.message); 
    } 
}

function displayAlerts(data, state) {
    const numAlerts = data.features.length; 
    const summary = document.createElement("h2"); 
    summary.textContent = `Weather Alerts: ${numAlerts}`;
    alertsDisplay.appendChild(summary); 

    if (numAlerts > 0) {
        const list = document.createElement("ul"); 
        data.features.forEach(alert => {
            const item = document.createElement("li"); 
            item.textContent = alert.properties.headline; 
            list.appendChild(item); 
        });
        alertsDisplay.appendChild(list); 
    }
}

function showError(message) {
    errorMessage.textContent = message; 
    errorMessage.classList.remove("hidden"); 
}

fetchButton.addEventListener("click", () => {
    const state = stateInput.value.trim().toUpperCase(); 
    fetchWeatherAlerts(state);
});