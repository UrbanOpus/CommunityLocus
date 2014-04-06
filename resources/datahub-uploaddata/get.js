dpd.district.get({$fields: {geojson: 0}}, function(districts, err){

for(var i= 0; i< districts.length;i++){
    
    var district = districts[i];
    var name = districts[i].name.replace(/\s/g,"-").toLowerCase() + "-livability-score";
    //console.log("https://hub.urbanopus.net/wotkit/api/sensors/hshsiao63." + name + "/fields/");
    request({
        uri: "https://hub.urbanopus.net/wotkit/api/sensors/hshsiao63." + name + "/data/",
        rejectUnauthorized: false,
        method: "POST",

        auth: {
            user: '0804553fc185c659',
            pass: "cff5bc2495725e81"
        },
        json: {
            "total-score": district.totalscore,
            "crime-score": district.scores["Category 1: Stability"].subcategory["Prevalence of petty crime"].score,
            "food-score": district.scores["Category 3: Culture & Environment"].subcategory["Food and drink"].score,
            "school-score": district.scores["Category 4: Education"].subcategory["Public education indicators"].score,
            "event-score": district.scores["Category 3: Culture & Environment"].subcategory["Cultural availability"].score,            
            },
            
            
    }, function (error, response, body){

        //done(error,body);
    });  

}


});