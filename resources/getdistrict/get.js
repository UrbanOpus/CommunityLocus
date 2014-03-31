//Get District by point

setWait(true);

dpd.district.get(function(district){    
            var pt = [query.lon, query.lat];
            var distName = null;
            
            
            for(var j in district){
                var name = district[j].name;
                var poly = district[j].geojson.geometry.coordinates[0];
                
                if (isPointInPoly(poly, pt)){
                    distName = name;
                    done(null, distName);   
                    break;
                }
            }
            
            
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