//Getting data from urban opus hub

setWait(true);
 
request({
  uri: "https://bennu.magic.ubc.ca/wotkit/api/v2/sensors/91722/data?start=0&end=100000000000000000",
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
        
    done(error,parsedJson);
});