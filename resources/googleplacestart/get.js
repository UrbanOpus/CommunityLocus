setWait(true);

var districtNames = ["Arbutus-Ridge", "Shaughnessy", "Riley Park", "South Cambie", "Kensington-Cedar Cottage", "Renfrew-Collingwood", "Oakridge", "Killarney", "Victoria-Fraserview", "Sunset", "Marpole", "Kerrisdale", "Dunbar-Southlands", "West Point Grey", "Kitsilano", "Fairview", "Mount Pleasant", "Downtown", "West End", "Strathcona", "Grandview-Woodland", "Hastings-Sunrise"];

var info = [];

    for(var i= 0; i< districtNames.length;i++){
        var name = districtNames[i].replace(/\s/g,"-");
        console.log(name);
        info.push({
        visibility:"PUBLIC",
        name:"google-places-" + name.toLowerCase(),
        description:"Google places results for " + name,
        longName:"Google Places - " + name,
        tags: ["google places"]
        });
    }
    
//done(null,info);

  for(var i= 0; i< districtNames.length;i++){
        var name = "google-places-" + districtNames[i].replace(/\s/g,"-").toLowerCase();
request({
  uri: "https://bennu.magic.ubc.ca/wotkit/api/groups/google-places/sensors/hsiao63." + name,
  rejectUnauthorized: false,
  method: "POST",

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




//request({
//  uri: "https://bennu.magic.ubc.ca/wotkit/api/sensors",
//  rejectUnauthorized: false,
//  method: "PUT",
//
//  auth: {
//    user: '2659c8d547e02eed',
//    pass: "a63d3998e7d534c1"
//  },
//  //user: "2659c8d547e02eed:a63d3998e7d534c1",
//  json: info
//}, function (error, response, body){
//    //console.log(error,response);
//    done(error,body);
//});