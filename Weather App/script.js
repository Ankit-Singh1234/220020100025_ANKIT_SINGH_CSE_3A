



const apiKey = '5860e42ca6cd596f94d93bb4883f7791';

async function fetchWeatherData(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
            throw new Error("Unable to fetch weather data");
        }
        const data = await response.json();
        updateWeatherUI(data);
        updateBackground(data.weather[0].main); // Update background based on weather condition
    } catch (error) {
        console.error(error);
        alert("Error: " + error.message);
    }
}

const cityElement = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility-distance");
const descriptionText = document.querySelector(".description-text");
const date = document.querySelector(".date");
const descriptionIcon = document.querySelector(".description-icon");
const temperatureInfo = document.querySelector(".temperature-info");
const additionalInfo = document.querySelector(".additional-info");

function updateWeatherUI(data) {
    cityElement.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;

    const windSpeedKmh = (data.wind.speed * 3.6).toFixed(2);
    windSpeed.textContent = `${windSpeedKmh} km/h`;

    humidity.textContent = `${data.main.humidity}%`;
    visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
    descriptionText.textContent = data.weather[0].description;

    const currentDate = new Date();
    date.textContent = currentDate.toDateString();

    const weatherIconName = getWeatherIconName(data.weather[0].main);
    descriptionIcon.textContent = weatherIconName;

    // Show the temperature and additional info sections
    temperatureInfo.style.display = "block";
    additionalInfo.style.display = "flex"; // Change to flex for better layout
}

const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input");

formElement.addEventListener("submit", function (e) {
    e.preventDefault();
    const city = inputElement.value.trim();
    if (city !== "") {
        fetchWeatherData(city);
        inputElement.value = "";
    }
});

function getWeatherIconName(weatherCondition) {
    const iconMap = {
        Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "cloud",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "cloud",
    };

    return iconMap[weatherCondition] || "help";
}

// Function to update the background based on weather condition
function updateBackground(condition) {
    const body = document.body;
    switch (condition) {
        case "Clear":
            body.style.backgroundImage = "url('clear-sky.jpg')";
            break;
        case "Clouds":
            body.style.backgroundImage = "url('cloudy-sky.jpg')";
            break;
        case "Rain":
            body.style.backgroundImage = "url('rainy.jpg')";
            break;
        case "Thunderstorm":
            body.style.backgroundImage = "url('thunderstorm.jpg')";
            break;
        case "Drizzle":
            body.style.backgroundImage = "url('drizzle.jpg')";
            break;
        case "Snow":
            body.style.backgroundImage = "url('snow.jpg')";
            break;
        case "Mist":
        case "Smoke":
        case "Haze":
        case "Fog":
            body.style.backgroundImage = "url('foggy.jpg')";
            break;
        default:
            body.style.backgroundImage = "url('default.jpg')";
    }
}
