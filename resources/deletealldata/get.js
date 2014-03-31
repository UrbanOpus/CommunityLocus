setWait(true);


DeleteAllData(parts[0]);

function DeleteAllData(dataName){    
    
    GetAllData(dataName, [], 0, function(items){
                
    for(var i in items){
        dpd[dataName].del(items[i].id);        
    }
    
    console.log("Deleted " + items.length + " " + dataName + " data");
    done(null,"Deleted " + items.length + " " + dataName + " data");
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