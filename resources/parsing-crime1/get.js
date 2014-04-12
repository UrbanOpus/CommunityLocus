setWait(true);

request({
  uri: "http://localhost:2403/data/crimedata.json",
  rejectUnauthorized: false,
  method: "GET"
}, function (error, response, body){
   
    var parsedJson = JSON.parse(body);
    var out = "";
    
    for(var i in parsedJson){
        var item = parsedJson[i];
        var str = item.HUNDRED_BLOCK.replace("XX","00") + ", VANCOUVER, BC, CANADA";

        out = out + str + "\n";
    }
    
    fs.writeFile("C:/crimeDataAddresses.json", out, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
    
    done(err,"Done writing file");
    }); 
});

