const airQ = new AirQuality("India", "Tamil Nadu", "Chennai");
const ui = new UI();
const country = document.getElementById("myCountry");

let city = "";
const pollutants = { aqius: 0, mainus: "", status: "Good" };
const weather = {
    city: "",
    temp: 0,
    pressure: 0,
    humidity: 0,
    wind: 0,
    icon: "",
};

const loadingWeather = (city, obj) => {
    weather["city"] = city;
    weather["temp"] = obj.tp;
    weather["pressure"] = obj.pr;
    weather["humidity"] = obj.hu;
    weather["wind"] = obj.ws;
    weather["icon"] = obj.ic;

    return weather;
};
const init = async() => {
    const initialData = await airQ.getInitialData();
    console.log(initialData);

    city = initialData.city;
    const aqius = Number(initialData.current.pollution.aqius);

    pollutants["aqius"] = aqius;
    pollutants["mainus"] = initialData.current.pollution.mainus;

    if (aqius <= 50) {
        pollutants["status"] = "Good";
    } else if (aqius > 50 && aqius <= 90) {
        pollutants["status"] = "Moderate";
    } else if (aqius > 90 && aqius <= 150) {
        pollutants["status"] = "Unhealthy";
    } else if (aqius > 150 && aqius < 170) {
        pollutants["status"] = "Bad";
    }

    console.log(pollutants);
    ui.displayAqiData(city, pollutants);

    // Dispalying Weather data
    ui.displayWeather(loadingWeather(city, initialData.current.weather));
};

// Initializing the App
init();

const selectedCountry = (e) => {
    console.log(e.currentTarget.value);
};
console.log(country);
// Getting the selected Country from the Dropdown
country.addEventListener("change", selectedCountry);