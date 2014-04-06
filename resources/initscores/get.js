//Getting score data into mongodb

setWait(true);
 
request({
  uri: host + "/data/categoryParsed.json",
  rejectUnauthorized: false,
  method: "GET"
}, function (error, response, body){
   
    var parsedJson = JSON.parse(body);
    
    dpd.district.get({$fields: {name: 1, population: 1}},function(districts){
   
        for(var i in districts){
            var name = districts[i].name;
            var id = districts[i].id;
            
            dpd.district.put(id,{scores: parsedJson});
        }
   
    done(error, parsedJson);    
    });
    

});