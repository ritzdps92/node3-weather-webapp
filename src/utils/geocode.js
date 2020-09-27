const request = require('postman-request');


const geocode = (address, callback) =>{
    const geoCodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1Ijoicml0emRwczkyIiwiYSI6ImNrZjB2enFpZjBuOGgyeXA3bmNjNXM0Z3IifQ.L5ZELt87iF2nhq1UYRqyAA"

    request({url:geoCodeUrl, json:true}, (error, response) =>{
        if(error)
        {
            callback("Unable to connect!!", undefined);
        }
        else if(response.body.features.length === 0)
        {
            callback("Unable to find the location!", undefined);
        }
        else{
            //console.log("from geocode.js: ", response.body.features[0]);
            callback(undefined, {
                longitutde: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    });
};



module.exports = geocode;