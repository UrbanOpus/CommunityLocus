setWait(true);

request({
  uri: "http://localhost:2403/data/crimeDataGeocoded.json",
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
    
    for(var i in parsedJson){
        var item = parsedJson[i];
        var str = item.HUNDRED_BLOCK.replace("XX","00") + ", VANCOUVER, BC, CANADA";

        for(var j=0;j<10;j++){
            var geocodedItem = parsedGeocoded[curRow+j];
            var geoStrInput = geocodedItem["Input Address"].substring(1);
            
            if(geoStrInput == str){
                curRow += j;
                break;            
            }
        }
        
        var geocodedItem = parsedGeocoded[curRow];
        var geoStrInput = geocodedItem["Input Address"].substring(1);
        
        if(geoStrInput == str && geocodedItem["Output Address"].indexOf("Vancouver, BC") > -1){
            parsedData.push({
                address: geocodedItem["Output Address"],
                lat: geocodedItem.Y,
                lon: geocodedItem.X,
                type: item.TYPE,
                year: item.YEAR,
                month: item.MONTH            
            });
        }
    
        curRow++;
    }
    
    fs.writeFile("C:/crimeDataParsed.json", JSON.stringify(parsedData), function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
    
    done(err,"Done writing file");
    }); 
    
    done(error,parsedData);
});

});
