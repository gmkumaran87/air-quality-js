class AirQuality {
    constructor(country, state, city) {
        this.country = country;
        this.state = state;
        this.city = city;
        this.secretKey = "1ffca47a-c224-48f6-9799-84d628f5b229";

        //  this.state = http: //api.airvisual.com/v2/states?country={{COUNTRY_NAME}}&key={{YOUR_API_KEY}}
    }

    getInitialData = async() => {
        const countries = await fetch(
            `http://api.airvisual.com/v2/nearest_city?key=${this.secretKey}`
            //`http://api.airvisual.com/v2/countries?key=${this.secretKey}`
        );

        const data = await countries.json();
        console.log(data.data);
        return data.data;
    };
}

/*
    http: //api.airvisual.com/v2/states?country={{COUNTRY_NAME}}&key={{YOUR_API_KEY}}
        http: //api.airvisual.com/v2/cities?state={{STATE_NAME}}&country={{COUNTRY_NAME}}&key={{YOUR_API_KEY}}*/