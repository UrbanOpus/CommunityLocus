request({
    uri: "http://localhost:2403/data/crimedata.json",
    rejectUnauthorized: false,
    method: "GET"
}, function (error, response, body){

    var parsedJson = JSON.parse(body);
    
    ParseCrimeAddress(parsedJson, 0, function(){
        console.log("Done!");
    });

});

function ParseCrimeAddress (data, index, retFn){
        console.log("Current Index: " + index);
        
        if(data[index] !== undefined){
        var item = data[index];
        var str = item.HUNDRED_BLOCK.replace("XX","00") + ", VANCOUVER, BC, CANADA";

        dpd["geocode"].get({address: str}, function(location){
            if(location !== null){
                AppendLine({address: str, location: location});
                ParseCrimeAddress(data, index+1, retFn);
            }
        });
        
        }else{
            retFn();
        }
}

function AppendLine(data){
    fs.appendFile("C:/crimeDataAddressGeocoded.json",JSON.stringify(data), function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }

    });
}
