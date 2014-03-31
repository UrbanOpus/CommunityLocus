setWait(true);

request({
  uri: "https://bennu.magic.ubc.ca/wotkit/api/sensors/?tags=foods",
  rejectUnauthorized: false,
  method: "GET",

  auth: {
    user: '2659c8d547e02eed',
    pass: "a63d3998e7d534c1"
  },
  //user: "2659c8d547e02eed:a63d3998e7d534c1",
//  json: parsedResults
}, function (error, response, body){
   
     var parsedJson = JSON.parse(body);
        
    
  for(var i= 0; i< parsedJson.length;i++){

request({
  uri: "https://bennu.magic.ubc.ca/wotkit/api/sensors/hsiao63." + parsedJson[i].name,
  rejectUnauthorized: false,
  method: "DELETE",

  auth: {
    user: '2659c8d547e02eed',
    pass: "a63d3998e7d534c1"
  },
  //user: "2659c8d547e02eed:a63d3998e7d534c1",
//  json: info
}, function (error, response, body){
    //console.log(error,response);
    done(error,body);
});

    }    
        
        
    done(error,parsedJson);
});




