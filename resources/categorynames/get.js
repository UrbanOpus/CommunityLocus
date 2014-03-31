setWait(true);

request({
  uri: "http://localhost:2403/data/categoryNames.txt",
  rejectUnauthorized: false,
  method: "GET"
}, function (error, response, body){
   
    var lines =  body.split("\n");
    var parsedData = {};
    var category = [];
    
    for(var i in lines){
        var item = lines[i].replace("\r","");
        
        if(item.indexOf("Category") > -1){            
            category = {};
            parsedData[item] = {
                name: item,
                weight: 0,
                score: 0,
                subcategory: category
            };
        }else{
            var data = {
            name: item,
            weight: 0,
            score: 0
            };
            
            category[item] = data;
        }
    }
    
    
    fs.writeFile("C:/categoryParsed.json", JSON.stringify(parsedData), function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
    
    done(err,"Done writing file");
    }); 
    
    done(error,parsedData);
});
