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

const loadPage = (currentData) => {
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

    ui.displayAqiData(city, pollutants);

    // Dispalying Weather data
    ui.displayWeather(loadingWeather(city, currentData.current.weather));
};
const init = async() => {
    const { countries, currentData } = await airQ.getInitialData();

    // Loading the Country Dropdown
    ui.loadDropdown(countryList, countries);

    loadPage(currentData);
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

        console.log(fetchedStates);
        // Loading the State Dropdown
        ui.loadDropdown(stateList, fetchedStates);
    } else if (datasetType === "state") {
        selectedPlace["state"] = selectedDataList;
        cityList.value = "";

        fetchedCities = await airQ.getDataLists(datasetType, selectedPlace);

        // Load the City DropDown
        ui.loadDropdown(cityList, fetchedCities);
    } else {
        selectedPlace["city"] = selectedDataList;

        const cityData = await airQ.getDataLists(datasetType, selectedPlace);
        loadPage(cityData);
    }
};

// Getting the selected Country from the Dropdown
countryList.addEventListener("change", handleChange);

stateList.addEventListener("change", handleChange);

cityList.addEventListener("change", handleChange);