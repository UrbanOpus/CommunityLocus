//Getting data from urban opus hub into mongodb

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
    
    dpd.district.get(function(district){
    
    var newJson = {};
    
        for(var i in parsedJson.content){
            var item = parsedJson.content[i];
            var pt = [item.lng, item.lat];
            var distName = null;
            
            for(var j in district){
                var name = district[j].name;
                var poly = district[j].geojson.geometry.coordinates[0];
                
                if (isPointInPoly(poly, pt)){
                    distName = name;
                    break;                
                }
            }
            
            if( distName !== null ){
                dpd.foods.post({
                    name: item.name,
                    rating: item.rating,
                    district: distName,
                    location: [item.lng, item.lat],
                    fsid: item.id
                });
            }        

    }
    
    done(error,parsedJson);
    
    });
    

});

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/math/is-point-in-poly [rev. #0]

function isPointInPoly(poly, pt){
    for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
        ((poly[i][1] <= pt[1] && pt[1] < poly[j][1]) || (poly[j][1] <= pt[1] && pt[1] < poly[i][1]))
            && (pt[0] < (poly[j][0] - poly[i][0]) * (pt[1] - poly[i][1]) / (poly[j][1] - poly[i][1]) + poly[i][0])
        && (c = !c);
    return c;
}