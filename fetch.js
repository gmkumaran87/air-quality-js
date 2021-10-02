class AirQuality {
    constructor(country, state, city) {
        this.country = country;
        this.state = state;
        this.city = city;
        this.secretKey = "1ffca47a-c224-48f6-9799-84d628f5b229";
    }

    getInitialData = async() => {
        try {
            const [currentPlace, countries] = await Promise.all([
                fetch(
                    `https://api.airvisual.com/v2/nearest_city?key=${this.secretKey}`, {
                        method: "GET",
                        mode: "no-cors",
                    }
                ).then((data) => data.json()),
                fetch(`https://api.airvisual.com/v2/countries?key=${this.secretKey}`, {
                    method: "GET",
                    mode: "no-cors",
                }).then((data) => data.json()),
            ]);

            if (currentPlace.status === "success" && countries.status === "success") {
                return { countries: countries.data, currentData: currentPlace.data };
            } else {
                throw new Error("Something went wrong!");
            }
        } catch (error) {
            console.log(`error`, error);
            return error;
        }
    };

    getDataLists = async(dataListType, dataList) => {
        console.log(dataList, dataListType);

        try {
            if (dataListType === "country") {
                const selectedPlace = dataList["country"];
                var data = await fetch(
                    `https://api.airvisual.com/v2/states?country=${selectedPlace}&key=${this.secretKey}`, {
                        method: "GET",
                        mode: "no-cors",
                    }
                );
            } else if (dataListType === "state") {
                const selectedPlace = dataList["state"];
                var data = await fetch(
                    `https://api.airvisual.com/v2/cities?state=${selectedPlace}&country=${dataList["country"]}&key=${this.secretKey}`, {
                        method: "GET",
                        mode: "no-cors",
                    }
                );
            } else if ((dataListType = "city")) {
                const selectedPlace = dataList["city"];
                var data = await fetch(
                    `https://api.airvisual.com/v2/city?city=${selectedPlace}&state=${dataList["state"]}&country=${dataList["country"]}&key=${this.secretKey}`, {
                        method: "GET",
                        mode: "no-cors",
                    }
                );
            }
            if (!data.ok) {
                throw new Error("Something went wrong!");
            }
            const region = await data.json();

            return region.data;
        } catch (error) {
            console.log(`error`, error);
        }
    };
}