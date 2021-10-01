class AirQuality {
    constructor(country, state, city) {
        this.country = country;
        this.state = state;
        this.city = city;
        this.secretKey = "1ffca47a-c224-48f6-9799-84d628f5b229";

        //  this.state = http: //api.airvisual.com/v2/states?country={{COUNTRY_NAME}}&key={{YOUR_API_KEY}}
    }

    getInitialData = async() => {
        try {
            const [currentPlace, countries] = await Promise.all([
                fetch(
                    `http://api.airvisual.com/v2/nearest_city?key=${this.secretKey}`
                ).then((data) => data.json()),
                fetch(`
                http://api.airvisual.com/v2/countries?key=${this.secretKey}`).then(
                    (data) => data.json()
                ),
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
        console.log(dataList, dataListType, selectedPlace);

        try {
            if (dataListType === "country") {
                const selectedPlace = dataList["country"];
                var data = await fetch(
                    `http://api.airvisual.com/v2/states?country=${selectedPlace}&key=${this.secretKey}`
                );
            } else if (dataListType === "state") {
                const selectedPlace = dataList["state"];
                var data = await fetch(
                    `http://api.airvisual.com/v2/cities?state=${selectedPlace}&country=${dataList["country"]}&key=${this.secretKey}`
                );
            }
            if (!data.ok) {
                throw new Error("Something went wrong!");
            }
            const states = await data.json();

            return states.data;
        } catch (error) {
            console.log(`error`, error);
        }
    };
}