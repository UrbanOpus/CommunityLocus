setWait(true);

request({
    uri: "http://localhost:2403/data/crimeDataAddressGeocoded.json",
    rejectUnauthorized: false,
    method: "GET"
}, function (error, response, body){

    var parsedGeocoded = JSON.parse(body);


    request({
        uri: "http://localhost:2403/data/crimedata.json",
        rejectUnauthorized: false,
        method: "GET"
    }, function (error, response, body){

        var parsedJson = JSON.parse(body);
        var parsedData = [];
        var curRow = 0;
        var successfulParse = 0;

        for(var i in parsedJson){
            var item = parsedJson[i];
            var str = item.HUNDRED_BLOCK.replace("XX","00") + ", VANCOUVER, BC, CANADA";

            var geocodedItem = parsedGeocoded[curRow];
            var geoStrInput = geocodedItem.address;


            if(geoStrInput == str){
            
            parsedData.push({
                address: str,
                lat: geocodedItem.location[1],
                lon: geocodedItem.location[0],
                type: item.TYPE,
                year: item.YEAR,
                month: item.MONTH
            });
            
                successfulParse++;


            }

            curRow++;
        }

    fs.writeFile("C:/crimeDataParsedGeocoded.json", JSON.stringify(parsedData), function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
        done(null,"successfulParse: " + successfulParse);
    }); 


    });

});

function GetCrimeDistrict(address, geocodedItem, item){
    dpd.getdistrict.get({lat: geocodedItem.location[1], lon: geocodedItem.location[0]},function(districtName){
        if(districtName !== null){
 

        }
    });
}