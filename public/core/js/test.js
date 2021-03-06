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
                GetCrimeDistrict(str, geocodedItem, item);
                break;


            }

            curRow++;
        }

//    fs.writeFile("C:/crimeDataParsed.json", JSON.stringify(parsedData), function(err) {
//    if(err) {
//        console.log(err);
//    } else {
//        console.log("The file was saved!");
//    }
        console.log(successfulParse);
        done(null,"successfulParse");
//    });


    });

});

function GetCrimeDistrict(address, geocodedItem, item){
    dpd.getdistrict.get({lat: geocodedItem.location[1], lon: geocodedItem.location[0]},function(districtName){
        if(districtName !== null){
            dpd.crime.post({
                address: geocodedItem["Output Address"],
                lat: geocodedItem.Y,
                lon: geocodedItem.X,
                type: item.TYPE,
                year: item.YEAR,
                month: item.MONTH
            });
        }
    });
}