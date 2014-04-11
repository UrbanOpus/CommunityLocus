setWait(true);

console.log("Updating Foods Data");
ExecuteURL(host + "/initfoods", function(){

console.log("Updating Events Data");
ExecuteURL(host + "/deletealldata/events",function(){
ExecuteURL(host + "/initevents", function(){

console.log("Calculating Score");
ExecuteURL(host + "/calculatescore/",function(){

done(null, "Done");
});

}); }); });

function ExecuteURL (url, nextFn){
    request({uri: url, method: "GET"        
    }, function (error, response, body){
        console.log(body);
        nextFn();
    });  
}

