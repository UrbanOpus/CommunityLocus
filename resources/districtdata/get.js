    
    //var json = JSON.parse(query);

   
//Put district data into mongodb
//dpd.district.get({name: query.name}, function(res){
//    dpd.district.put(res[0].id,{radius: query.radius, lat: query.lat, lon: query.lon});
//    console.log(res[0].name);
//});

//write out district data into json file
dpd.district.get(function(res){
    
    fs.writeFile("C:/districts.json", JSON.stringify(res), function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }

    }); 
});