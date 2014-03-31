//Getting Data from foursquare into urban opus data hub

setWait(true);

request('https://api.foursquare.com/v2/venues/explore?'+
"ll="+query.location[0]+","+query.location[1]+"&"+
"radius="+query.radius+"&"+
"section=food&"+
"v=20140305&"+
"limit=50&"+
"client_id=FT4CVZCS13JEFWTU4LU35DRAKL5OWGANH3C4BRVPBAKDTGQH&"+
"client_secret=DUWHM0KFJ54NI2WWFTPMGIIVZQW35BMTRMEL3VFUCY4V2PNX",

function (error, response, body) {
    
    var res = JSON.parse(body);
    var dataSet = res.response.groups[0].items;
    
    var parsedResults = [];
    var date = (new Date()).toISOString();
    
for(var i= 0; i< dataSet.length && i < 100;i++){
     var item = dataSet[i].venue;
     var location = item.location;
     var data = {
        lat: location.lat,
        lng: location.lng,
        id: item.id,
        rating: item.rating,
        name: item.name
     };
        
         request({
  uri: "https://bennu.magic.ubc.ca/wotkit/api/sensors/91722/data",
  rejectUnauthorized: false,
  method: "POST",

  auth: {
    user: '2659c8d547e02eed',
    pass: "a63d3998e7d534c1"
  },
  //user: "2659c8d547e02eed:a63d3998e7d534c1",
  json: data
});

}
    done(error,dataSet);
    
});