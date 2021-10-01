const airQ = new AirQuality("India", "Tamil Nadu", "Chennai");
const ui = new UI();
const countryList = document.getElementById("myCountry");
const stateList = document.getElementById("myState");
const cityList = document.getElementById("myCity");

const selectedPlace = { country: "", state: "", city: "" };

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
    const { countries, currentData } = await airQ.getInitialData();

    // Loading the Country Dropdown
    ui.loadDropdown(countryList, countries);

    city = currentData.city;
    const aqius = Number(currentData.current.pollution.aqius);

    pollutants["aqius"] = aqius;
    pollutants["mainus"] = currentData.current.pollution.mainus;

    if (aqius <= 50) {
        pollutants["status"] = "Good";
    } else if (aqius > 50 && aqius <= 90) {
        pollutants["status"] = "Moderate";
    } else if (aqius > 90 && aqius <= 150) {
        pollutants["status"] = "Unhealthy For Sensitive Groups";
    } else if (aqius > 150 && aqius < 170) {
        pollutants["status"] = "Bad";
    }

    console.log(pollutants);
    ui.displayAqiData(city, pollutants);

    // Dispalying Weather data
    ui.displayWeather(loadingWeather(city, currentData.current.weather));
};

// Initializing the App
init();

const handleChange = async(e) => {
    let [fetchedStates, fetchedCities] = ["", ""];

    let datasetType = e.currentTarget.dataset.type;

    let selectedDataList = e.currentTarget.value;

    if (datasetType === "country") {
        selectedPlace["country"] = selectedDataList;

        //Clearing the old values of State and City Input
        stateList.value = "";
        cityList.value = "";

        fetchedStates = await airQ.getDataLists(datasetType, selectedPlace);
        // Loading the Country Dropdown
        ui.loadDropdown(stateList, fetchedStates);
    } else if (datasetType === "state") {
        cityList.list.innerHTML = "";
        selectedPlace["state"] = selectedDataList;
        fetchedCities = await airQ.getDataLists(datasetType, selectedPlace);
        ui.loadDropdown(cityList, fetchedCities);
    }
};

// Getting the selected Country from the Dropdown
countryList.addEventListener("change", handleChange);

stateList.addEventListener("change", handleChange);