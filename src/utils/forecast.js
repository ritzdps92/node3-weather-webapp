const request = require('postman-request');


const forecast = (longitude, latitude, callback) =>{
    console.log("from forecast code, longitude:", longitude);
    console.log("from forecast code, latitude:", latitude);
    const url = 'http://api.weatherstack.com/current?access_key=dc3e2a0c1b715d522ef96664b4a913d3&query='+ latitude +','+ longitude;
    request({url:url, json: true}, (error, response) =>{
        if(error)
        {
            callback("Unable to connect!!", undefined)
        }
        else if(response.body.error){
            callback(response.body.error.info, undefined);
        }
        else {
            callback(undefined, response.body.current.weather_descriptions[0] + " .It is currently " + response.body.current.temperature + " degress out. And there is " + response.body.current.precip + "% chances of rain. It feels like "+ response.body.current.feelslike + " degress out. The Humidity is " +response.body.current.humidity +" %.")
                //  temp: response.body.current.temperature,
                //  precip: response.body.current.precip,
                //  descrip: response.body.current.weather_descriptions[0]
    
        }
        
    })
};

module.exports = forecast;
