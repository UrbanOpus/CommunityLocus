dpd.district.get({$fields: {name: 1, lat: 1, lon: 1}}, function(districts, err){

//var districtNames = ["Arbutus-Ridge", "Shaughnessy", "Riley Park", "South Cambie", "Kensington-Cedar Cottage", "Renfrew-Collingwood", "Oakridge", "Killarney", "Victoria-Fraserview", "Sunset", "Marpole", "Kerrisdale", "Dunbar-Southlands", "West Point Grey", "Kitsilano", "Fairview", "Mount Pleasant", "Downtown", "West End", "Strathcona", "Grandview-Woodland", "Hastings-Sunrise"];

var info = [];

for(var i= 0; i< districts.length;i++){
    var district = districts[i];
    var name = districts[i].name.replace(/\s/g,"-");    
    console.log(name);
    
    info.push({
        visibility:"PUBLIC",
        name: name.toLowerCase() + "-livability-score",
        description:"Community score for " + name,
        longName:"Community score - " + name,
        latitude: district.lat,
        longitude: district.lon,
        tags: ["CommunityLocus"]
    });
}

//done(null,info);


//    request({
//        uri: "https://hub.urbanopus.net/wotkit/api/sensors/",
//        rejectUnauthorized: false,
//        method: "put",
//
//        auth: {
//            user: '0804553fc185c659',
//            pass: "cff5bc2495725e81"
//        },
//        json: info
//    }, function (error, response, body){
//        //console.log(error,response);
//        done(error,body);
//    });

for(var i= 0; i< districts.length;i++){
    
    var name = districts[i].name.replace(/\s/g,"-").toLowerCase() + "-livability-score";
    //console.log("https://hub.urbanopus.net/wotkit/api/sensors/hshsiao63." + name + "/fields/");
    request({
        uri: "https://hub.urbanopus.net/wotkit/api/sensors/hshsiao63." + name + "/fields/total-score",
        rejectUnauthorized: false,
        method: "PUT",

        auth: {
            user: '0804553fc185c659',
            pass: "cff5bc2495725e81"
        },
        json: {"name":"total-score",
            "type":"NUMBER",
            "longName":"Total score",
            "required":false,
            },
            
            
    }, function (error, response, body){
        console.log(error,body);
        //done(error,body);
    });
    
    request({
        uri: "https://hub.urbanopus.net/wotkit/api/sensors/hshsiao63." + name + "/fields/food-score",
        rejectUnauthorized: false,
        method: "PUT",

        auth: {
            user: '0804553fc185c659',
            pass: "cff5bc2495725e81"
        },
        json: {"name":"food-score",
            "type":"NUMBER",
            "longName":"Food score",
            "required":false,
            },
            
            
    }, function (error, response, body){
        console.log(error,body);
        //done(error,body);
    });
    
        request({
        uri: "https://hub.urbanopus.net/wotkit/api/sensors/hshsiao63." + name + "/fields/event-score",
        rejectUnauthorized: false,
        method: "PUT",

        auth: {
            user: '0804553fc185c659',
            pass: "cff5bc2495725e81"
        },
        json: {"name":"event-score",
            "type":"NUMBER",
            "longName":"Event score",
            "required":false,
            },
            
            
    }, function (error, response, body){
        console.log(error,body);
        //done(error,body);
    });
    
    request({
        uri: "https://hub.urbanopus.net/wotkit/api/sensors/hshsiao63." + name + "/fields/school-score",
        rejectUnauthorized: false,
        method: "PUT",

        auth: {
            user: '0804553fc185c659',
            pass: "cff5bc2495725e81"
        },
        json: {"name":"school-score",
            "type":"NUMBER",
            "longName":"School score",
            "required":false,
            },
            
            
    }, function (error, response, body){
        console.log(error,body);
        //done(error,body);
    });
    
    request({
        uri: "https://hub.urbanopus.net/wotkit/api/sensors/hshsiao63." + name + "/fields/crime-score",
        rejectUnauthorized: false,
        method: "PUT",

        auth: {
            user: '0804553fc185c659',
            pass: "cff5bc2495725e81"
        },
        json: {"name":"crime-score",
            "type":"NUMBER",
            "longName":"Crime score",
            "required":false,
            },
            
            
    }, function (error, response, body){
        console.log(error,body);
        //done(error,body);
    });
    
    request({
        uri: "https://hub.urbanopus.net/wotkit/api/sensors/hshsiao63." + name + "/fields/lat",
        rejectUnauthorized: false,
        method: "DELETE",
        auth: {
            user: '0804553fc185c659',
            pass: "cff5bc2495725e81"
        },  
    }, function (error, response, body){
        console.log(error,body);
        //done(error,body);
    });
    
        request({
        uri: "https://hub.urbanopus.net/wotkit/api/sensors/hshsiao63." + name + "/fields/lng",
        rejectUnauthorized: false,
        method: "DELETE",
        auth: {
            user: '0804553fc185c659',
            pass: "cff5bc2495725e81"
        },  
    }, function (error, response, body){
        console.log(error,body);
        //done(error,body);
    });
    
        request({
        uri: "https://hub.urbanopus.net/wotkit/api/sensors/hshsiao63." + name + "/fields/value",
        rejectUnauthorized: false,
        method: "DELETE",
        auth: {
            user: '0804553fc185c659',
            pass: "cff5bc2495725e81"
        },  
    }, function (error, response, body){
        console.log(error,body);
        //done(error,body);
    });
    
        request({
        uri: "https://hub.urbanopus.net/wotkit/api/sensors/hshsiao63." + name + "/fields/message",
        rejectUnauthorized: false,
        method: "DELETE",
        auth: {
            user: '0804553fc185c659',
            pass: "cff5bc2495725e81"
        },  
    }, function (error, response, body){
        console.log(error,body);
        //done(error,body);
    });
}

//for(var i= 0; i< districts.length;i++){
//    var name = districts[i].name.replace(/\s/g,"-").toLowerCase() + "-livability-score";
//    request({
//        uri: "https://hub.urbanopus.net/wotkit/api/groups/google-places/sensors/hsiao63." + name,
//        rejectUnauthorized: false,
//        method: "POST",
//
//        auth: {
//            user: '0804553fc185c659',
//            pass: "cff5bc2495725e81"
//        },
//        json: info
//    }, function (error, response, body){
//        //console.log(error,response);
//        done(error,body);
//    });
//
//}

});