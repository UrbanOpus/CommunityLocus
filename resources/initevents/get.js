//Getting Data from meetup into mongodb

setWait(true);

//Deleting all data
dpd.events.get(function(items){
    for(var i in items){
        dpd.events.del(items[i].id);
    }
});

GetOpenEvents(0, 200, 1000);

function GetOpenEvents (offset, itemsPerPage, maxCount){
    
    
    request('https://api.meetup.com/2/open_events?'+
//"&radius="+ district.radius * 0.000621371192 +
"&lat=" + 49 + //district.lat +
"&lon=" + -123 +//district.lon +
"&page=" + itemsPerPage +
"&offset=" + offset +
//"&city=vancouver"+
//"&country=canada"+
"&key=2d585c6e3663155a68121b417174017",

function (error, response, body) {
    
    var json = JSON.parse(body);
    
    for(var i in json.results){
        GetEventDistrict(json.results[i]);
    }        
        //console.log(json.results.length);
    console.log("Getting Offset: " + offset*itemsPerPage);
    console.log("Got " + json.results.length + " results");
    
    
    if(json.results.length > 0 && offset*itemsPerPage < maxCount){        
        setTimeout(function (){
            GetOpenEvents(offset+1, itemsPerPage, maxCount);
        }, 10000); 
    }else{
        console.log("Done! Got " + offset*itemsPerPage + " events.");
        done(null, "Done! Got " + offset*itemsPerPage + " events.");
    }
});

}

function GetEventDistrict(item){
    
    dpd.events.get({meetupid: item.id}, function(result, err){
        if(item.venue){
        
        var lat = item.venue.lat;
        var lon = item.venue.lon;
    
      dpd.getdistrict.get({lat: lat, lon: lon}, function(districtName,error){
            if(districtName !== null){
                
                if(result.length === 0){
                dpd.events.post({
                    name: item.name,
                    desc: item.description,
                    meetupid: item.id,
                    url: item.event_url,
                    district: districtName,
                    obj: item,
                    location: [lon, lat]
                });
                }else{
                    dpd.events.post(result[0].id,{
                    name: item.name,
                    desc: item.description,
                    meetupid: item.id,
                    url: item.event_url,
                    district: districtName,
                    obj: item,
                    location: [lon, lat]
                });
                }
            }
        });
    }
        
    });
}
