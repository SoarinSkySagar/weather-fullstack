import request from 'postman-request';

export const getWeather = async (error, data, address, fn) => {
    if (error != undefined) {
        console.log(error);
    } else {
        const url = 'http://api.weatherstack.com/current?access_key=fd017b52a0e8b534dcbee76e1532e634&query='+data.lat+','+data.lon;
        request({url: url, json: true}, (error, response) => {
            if (error) {
                console.log('Something went wrong!');
                fn({ error: 'Something went wrong!' })
            } else {
                const forecast = {
                    address,
                    location: data.name,
                    current: response.body.current.weather_descriptions[0],
                    temperature: response.body.current.temperature+' °C',
                    feelsLike: response.body.current.feelslike+' °C'
                };
                if (String(typeof(fn)) === 'function') {
                    fn(forecast);
                }
            }
        })
    }
}