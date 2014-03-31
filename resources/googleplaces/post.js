setWait(true);
//done(null,query);

var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'+ parts[0];
//request('https://maps.googleapis.com/maps/api/place/nearbysearch/json?'+ parts[0], function (error, response, body) {
//    done(error,body);
//});



 

request('https://maps.googleapis.com/maps/api/place/radarsearch/json?'+
"location="+query.location[0]+","+query.location[1]+"&"+
"radius="+query.radius+"&"+
"types=food&"+
"sensor=false&"+
"key="+query.key,

function (error, response, body) {
    
    var dataSet = JSON.parse(body);
    
    var parsedResults = [];
    var date = (new Date()).toISOString();
    
for(var i= 0; i< dataSet.results.length && i < 100;i++){
     var item = dataSet.results[i];
     var location = item.geometry.location;
     var data = {
        lat: location.lat,
        lng: location.lng,
        id: item.id
     };
        
         request({
  uri: "https://bennu.magic.ubc.ca/wotkit/api/sensors/91620/data",
  rejectUnauthorized: false,
  method: "POST",

  auth: {
    user: '2659c8d547e02eed',
    pass: "a63d3998e7d534c1"
  },
  //user: "2659c8d547e02eed:a63d3998e7d534c1",
  json: data
}, function (error, response, body){
    //console.log(error,response);
    //done(error,body);
});

}

console.log(parsedResults.length);
    
       
    
    //console.log(response.results[1]);
    done(error,"dataSet");
});
