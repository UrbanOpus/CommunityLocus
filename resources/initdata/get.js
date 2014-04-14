setWait(true);

console.log("Initializing District Data");
ExecuteURL(host + "/deletealldata/district",function(){
ExecuteURL(host + "/initdistricts", function(){

console.log("Initializing Crime Data");
ExecuteURL(host + "/deletealldata/crime",function(){
ExecuteURL(host + "/initcrimes", function(){

console.log("Initializing School Data");
ExecuteURL(host + "/deletealldata/schools",function(){
ExecuteURL(host + "/initschools", function(){

console.log("Initializing Foods Data");
ExecuteURL(host + "/deletealldata/foods",function(){
ExecuteURL(host + "/initfoods", function(){

console.log("Initializing Events Data");
ExecuteURL(host + "/deletealldata/events",function(){
ExecuteURL(host + "/initevents", function(){

console.log("Calculating Score");
ExecuteURL(host + "/calculatescore/",function(){

done(null, "Done");
});

}); });

}); });

}); });

}); });

}); });

function ExecuteURL (url, nextFn){
    request({uri: url, method: "GET"        
    }, function (error, response, body){
        console.log(body);
        nextFn();
    });  
}

