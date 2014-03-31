//Getting school data into mongodb

setWait(true);
 
request({
  uri: "http://localhost:2403/data/schoolGeocoded.json",
  rejectUnauthorized: false,
  method: "GET"
}, function (error, response, body){
   
    var parsedJson = JSON.parse(body);
    
    dpd.district.get(function(district){
    
    var newJson = {};
    var count = 0;
    
        for(var i in parsedJson){
            var item = parsedJson[i];
            var pt = [item.lon, item.lat];
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

           //Deleting all data
//                dpd.schools.get({name: item.name},function(res){
//                    for(var i in res){
//                        dpd.schools.del(res[i].id);
//                    }
//                });
    
                    
                    
                dpd.schools.post({
                    address: item.address,
                    district: distName,
                    location: [item.lon, item.lat],
                    rating: item.rating,
                    name: item.name,
                    rank: item.rank
                });           

                                
            }        

    }
    
    done(error,"Done: " + count);
    
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
