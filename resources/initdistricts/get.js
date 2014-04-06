//Getting District data into mongodb

setWait(true);

request({
    uri: host + "/data/districts.json",
    rejectUnauthorized: false,
    method: "GET"
}, function (error, response, body){

    var parsedJson = JSON.parse(body);

    for(var i in parsedJson){
        var item = parsedJson[i];
        item.id = null;
        
        dpd.district.post(item);
    }
    
    done(error,"Done: " + parsedJson.length);
});

//dpd.district.get({$fields: {id: 0}, }, function (results, err){    
//            
//    fs.writeFile("C:/districts.json", JSON.stringify(results), function(err) {
//    if(err) {
//        console.log(err);
//    } else {
//        console.log("The file was saved!");
//    }
//    
//    done(err,"Done writing file");
//    }); 
//    
//});