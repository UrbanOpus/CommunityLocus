
dpd.schools.get({$fields: {id: 0}, }, function (results, err){    
            
    fs.writeFile("C:/schoolGeocoded.json", JSON.stringify(results), function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
    
    done(err,"Done writing file");
    }); 
    
});