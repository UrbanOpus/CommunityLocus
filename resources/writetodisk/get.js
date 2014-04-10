setWait(true);

SaveData(parts[0]);

function SaveData(dataName){    
    
    GetAllData(dataName, [], 0, function(items){
                
    fs.writeFile("C:/" + dataName +".json", JSON.stringify(items), function(err) {
    if(err) {
        console.log(err);
    }    
    done(err,"Done writing " + items.length + " " +dataName + " to file");
    }); 

    });
}

function GetAllData (dataName, data, skip, returnFunction){
      
    dpd[dataName].get({$skip: skip, $limit: 200},function(result, error){
                
        if(result.length > 0 ){
            data = data.concat(result);
            GetAllData(dataName, data, skip+200, returnFunction);
        }else{
            returnFunction(data);
        }
    });
}