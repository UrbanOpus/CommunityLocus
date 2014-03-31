setWait(true);

request({
  uri: "http://localhost:2403/data/schoolUnparsed.json",
  method: "GET"
}, function (error, response, body){
    
    var json = JSON.parse(body);
    var parsedData = [];
    
    for(var i in json){    
    requestCoords(json[i], parsedData, json.length);    
    }
    
//    setTimeout(function (){
//    }, 3000);
    
});

function requestCoords(item, parsedData, arrayLength){
    
    request({
    uri: "http://apps.gov.bc.ca/pub/geocoder/addresses.geojson?&addressString=" + item.Address,
    method: "GET"
    }, function (error, response, body){
        var json2 = JSON.parse(body);
        
        parsedData.push({
            name: item["School Name"],
            address: item.Address,
            lon: json2.features[0].geometry.coordinates[0],
            lat: json2.features[0].geometry.coordinates[1],
            rank: item["2011-12 Rank"],
            rating: item["2011-12 Rating"]
        });
        
        
     //console.log(parseFloat(item["2011-12 Rating"]));
     
    if(parsedData.length == arrayLength){
    
    fs.writeFile("C:/schoolGeocoded.json", JSON.stringify(parsedData), function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
    
    done(err,"Done writing file");
    }); 
    
        }
        
    });
}