//Geodecode

setWait(true);

request({
  uri: "http://apps.gov.bc.ca/pub/geocoder/addresses.geojson?&addressString=" + query.address,
  method: "GET"
}, function (error, response, body){   
    var parsedJson = JSON.parse(body);
    
    if(parsedJson != null){
        if(parsedJson.features.length > 0){
        done(null, parsedJson.features[0].geometry.coordinates);
        }
    }
    
    done(null, null);    
});
