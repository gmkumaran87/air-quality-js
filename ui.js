class UI {
    constructor() {
        // Pollutant Summary
        this.aqiOverview = document.querySelector(".aqi-overview");
        this.aqiValueEl = document.querySelector(".aqi-value");

        this.cityHeader = document.querySelector(".city-header");
        this.cityPara = document.querySelector(".city-para");
        this.aqiStatus = document.querySelector(".aqi-status");
        this.aqiValue = document.querySelector(".aqi-value-val");

        this.list = document.getElementById("aqi-table-row");

        this.pmLevel = {
            //object containing units information
            p2: "PM2.5", //pm2.5
            p1: "PM10", //pm10
            o3: "ppb", //Ozone O3
            n2: "ppb", //Nitrogen dioxide NO2
            s2: "ppb", //Sulfur dioxide SO2
            co: "ppm", //Carbon monoxide CO
        };

        // Weather details
        this.cityWeather = document.querySelector(".weather-city");
        this.weatherTableRow = document.getElementById("weather-table-row");
        this.weatherImage = document.querySelector(".weather-image");

        this.weatherIcon = {
            "01d": {
                desc: "Clear Sky(Day)",
                icon: "https://res.cloudinary.com/gmkumaran87/image/upload/v1633005692/Weather_Icons/01d.png",
            },
            "01n": {
                desc: "Clear Sky(Night)",
                icon: "https://res.cloudinary.com/gmkumaran87/image/upload/v1633005723/Weather_Icons/01n_giubca.png",
            },
            "02d": {
                desc: "Few Clouds(Day)",
                icon: "https://res.cloudinary.com/gmkumaran87/image/upload/v1633005723/Weather_Icons/02d_mjh4wl.png",
            },
            "02n": {
                desc: "Few Clouds(Night)",
                icon: "https://res.cloudinary.com/gmkumaran87/image/upload/v1633005723/Weather_Icons/02n_zpz0db.png",
            },
            "03d": {
                desc: "Scatterd Clouds",
                icon: "https://res.cloudinary.com/gmkumaran87/image/upload/v1633005723/Weather_Icons/03d_o1bduv.png",
            },
            "04d": {
                desc: "Broken Clouds",
                icon: "https://res.cloudinary.com/gmkumaran87/image/upload/v1633005723/Weather_Icons/04d_jpwi34.png",
            },
            "09d": {
                desc: "Shower Rain",
                icon: "https://res.cloudinary.com/gmkumaran87/image/upload/v1633005723/Weather_Icons/09d_ed135q.png",
            },
            "10d": {
                desc: "Rain(Day)",
                icon: "https://res.cloudinary.com/gmkumaran87/image/upload/v1633005723/Weather_Icons/10d_wlfbom.png",
            },
            "10n": {
                desc: "Rain(Night time)",
                icon: "https://res.cloudinary.com/gmkumaran87/image/upload/v1633005723/Weather_Icons/10n_kzsgmg.png",
            },
            "11d": {
                desc: "Thunderstrom",
                icon: "https://res.cloudinary.com/gmkumaran87/image/upload/v1633005724/Weather_Icons/11d_bv5rui.png",
            },
            "13d": {
                desc: "Snow",
                icon: "https://res.cloudinary.com/gmkumaran87/image/upload/v1633005724/Weather_Icons/13d_x1bc7y.png",
            },
            "50d": {
                desc: "Mist",
                icon: "https://res.cloudinary.com/gmkumaran87/image/upload/v1633005724/Weather_Icons/50d_lpsoz9.png",
            },
        };
    }

    displayAqiData(city, pollutants) {
        let overwiewDiv = "";
        let aqiValueDiv = "";

        this.cityHeader.innerHTML = city;
        this.cityPara.innerHTML = city;
        this.aqiValue.innerHTML = pollutants.aqius;
        this.aqiStatus.innerHTML = pollutants.status;

        switch (pollutants.status) {
            case "Unhealthy":
                overwiewDiv = "aqi-orange";
                aqiValueDiv = "aqi-box-orange";
                break;
            case "Good":
                overwiewDiv = "aqi-green";
                aqiValueDiv = "aqi-box-green";
                break;
            case "Moderate":
                overwiewDiv = "aqi-yello";
                aqiValueDiv = "aqi-box-yello";
                break;
            case "Bad":
                overwiewDiv = "aqi-red";
                aqiValueDiv = "aqi-box-red";
                break;

            default:
                break;
        }
        // Applying the clase for the appropriate pollution level
        this.aqiOverview.classList.add(overwiewDiv);
        this.aqiValueEl.classList.add(aqiValueDiv);

        // Creating a table row
        const row = document.createElement("tr");

        // Loading the table row contents
        row.innerHTML = `<td>${pollutants.status}</td>
            <td>${pollutants.aqius} US AQI</td>
            <td>${this.pmLevel[pollutants.mainus]}</td>`;

        this.list.appendChild(row);
    }

    displayWeather(obj) {
        this.cityWeather.innerHTML = obj.city;

        this.weatherImage.src = this.weatherIcon[obj.icon]["icon"];
        this.weatherImage.alt = this.weatherIcon[obj.icon]["desc"];

        console.log(this.weatherIcon[obj.icon]["desc"]);
        // Creating a table row
        const row = document.createElement("tr");

        // Loading the table row contents
        row.innerHTML = `<td>${this.weatherIcon[obj.icon]["desc"]}</td>
                       <td>${obj.temp}C</td>
                       <td>${obj.humidity}%</td>
                       <td>${obj.wind}Km/h</td>
                       <td>${obj.pressure}mb</td>`;

        this.weatherTableRow.append(row);
    }
}