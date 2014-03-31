//Getting Data from foursquare into mongodb

//setWait(true);

dpd.district.get({$fields: {name: 1, lat: 1, lon: 1, radius: 1} },function(districts){
    var numCalls = {num: 0};

//    for(var i in districts){
//    var district = districts[i];    
//    //GetFoodsByDistrict(district, 0, 50, 200);
//    GetFoodsByDistrict(district, 0, 10, 10);
//    break;
//    }
    
    GetFoods(districts);
    //done(null,"Done");
});

function GetFoods(districts){
   var district = districts.pop();
   console.log("Getting Foods for " + district.name);
   
   GetFoodsByDistrict(district, 0, 50, 200, function(){
        if(districts.length > 0){
            setTimeout(function (){
                   GetFoods(districts);
            }, 10000);            
        }
   });
}

function GetFoodsByDistrict (district, offset, itemsPerPage, maxCount, returnFunc){

    console.log("Getting Foods: " + (offset+1)*itemsPerPage);

    request('https://api.foursquare.com/v2/venues/explore?'+
    "ll="+ district.lat +"," + district.lon +"&"+
    "radius="+ district.radius +"&"+
    "section=food&"+
    "v=20140305&"+
    "limit=" + itemsPerPage + "&"+
    "offset" + offset*itemsPerPage + "&" +
    "client_id=FT4CVZCS13JEFWTU4LU35DRAKL5OWGANH3C4BRVPBAKDTGQH&"+
    "client_secret=DUWHM0KFJ54NI2WWFTPMGIIVZQW35BMTRMEL3VFUCY4V2PNX",

    function (error, response, body) {

        var res = JSON.parse(body);
        
        var dataSet = res.response.groups[0].items;


        for(var i= 0; i< dataSet.length;i++){
            var item = dataSet[i].venue;
            GetFoodDistrict(item);
        }

        if(dataSet.length > 0 && (offset+1)*itemsPerPage < maxCount){
                setTimeout(function (){
                   GetFoodsByDistrict(district, offset+1, itemsPerPage, maxCount, returnFunc);
                }, 10000);
        }else{
            console.log("Got " + (offset+1)*itemsPerPage + " total for " + district.name);
            returnFunc();
        }

        });
        
}

function GetFoodDistrict(item){
    
    if( item !== null){

    dpd.foods.get({fsid: item.id}, function(result, err){
        if(result.length === 0 ){
            var lat = item.location.lat;
            var lon = item.location.lng;
            
            dpd.getdistrict.get({lat: lat, lon: lon}, function(districtName,error){
               if(districtName !== null){
                var location = item.location;
                
                dpd.foods.post({
                    name: item.name,
                    rating: item.rating,
                    district: districtName,
                    location: [location.lng, location.lat],
                    fsid: item.id,
                    obj: item
                });     
            }
        });
        
        }
    });

        
    }
}