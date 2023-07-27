import request from 'postman-request';

export const geocode = (address, callback, cb) => {
    const url = 'https://geocode.maps.co/search?q='+encodeURIComponent(address);
    return new Promise((resolve, reject) => {
        var result = {};
        request({url: url, json: true}, async (error, response) => {
            if (error) {
                callback('Unable to connect to location services', undefined);
                cb({ error: 'Unable to connect to location services' })
            } else if (response.body.length === 0) {
                callback('Unable to find location', undefined);
                cb({ error: 'Unable to find location'})
            } else {
                const forecast = await callback(undefined, {
                    lat: response.body[0].lat,
                    lon: response.body[0].lon,
                    name: response.body[0].display_name,
                }, address);
                return callback(undefined, {
                    lat: response.body[0].lat,
                    lon: response.body[0].lon,
                    name: response.body[0].display_name,
                }, address, (forecast) => {
                    resolve(forecast);
                    // console.log(forecast)
                    cb(forecast);
                }); 
                
            }
        })
    })

};