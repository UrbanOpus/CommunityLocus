//Getting crime data into mongodb

setWait(true);

//remove all crime data (currently not working)
//dpd.deletealldata.get("crime");

request({
  uri: "http://localhost:2403/data/crimeDataParsedGeocoded.json",
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
                var rating = -1;
                
                if(item.type == "Theft From Auto Under $5000"){
                    rating = 1;
                }else if(item.type == "Theft From Auto Over $5000"){
                    rating = 2;
                }else if(item.type == "Mischief Under $5000"){
                    rating = 1;
                }else if(item.type == "Mischief Over $5000"){
                    rating = 2;
                }else if(item.type == "Thef Of Auto Under $5000"){
                    rating = 1;
                }else if(item.type == "Theft Of Auto Over $5000"){
                    rating = 2;
                }else if(item.type == "Commercial BE"){
                    rating = 5;
                }
                
                if(rating > 0){
                         
                dpd.crime.post({
                    address: item.address,
                    type: item.type,
                    year: item.year,
                    month: item.month,
                    district: distName,
                    location: [item.lon, item.lat],
                    rating: rating
                });           
                
                    count++;
                }
                                
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
