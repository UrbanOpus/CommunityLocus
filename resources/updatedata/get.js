setWait(true);

console.log("Updating Foods Data");
ExecuteURL("http://localhost:2403/initfoods", function(){

console.log("Updating Events Data");
ExecuteURL("http://localhost:2403/initevents", function(){

console.log("Calculating Score");
ExecuteURL("http://localhost:2403/calculatescore/",function(){

done(null, "Done");
});

}); });

function ExecuteURL (url, nextFn){
    request({uri: url, method: "GET"        
    }, function (error, response, body){
        console.log(body);
        nextFn();
    });  
}

