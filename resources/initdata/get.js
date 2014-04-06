setWait(true);

console.log("Initializing District Data");
ExecuteURL("http://localhost:2403/deletealldata/district",function(){
ExecuteURL("http://localhost:2403/initdistricts", function(){

console.log("Initializing Crime Data");
ExecuteURL("http://localhost:2403/deletealldata/crime",function(){
ExecuteURL("http://localhost:2403/initcrimes", function(){

console.log("Initializing School Data");
ExecuteURL("http://localhost:2403/deletealldata/schools",function(){
ExecuteURL("http://localhost:2403/initschools", function(){

//console.log("Initializing Foods Data");
//ExecuteURL("http://localhost:2403/deletealldata/foods",function(){
//ExecuteURL("http://localhost:2403/initfoods", function(){
//
//console.log("Initializing Events Data");
//ExecuteURL("http://localhost:2403/deletealldata/events",function(){
//ExecuteURL("http://localhost:2403/initevents", function(){

console.log("Calculating Score");
ExecuteURL("http://localhost:2403/calculatescore/",function(){

done(null, "Done");
});

//}); });
//
//}); });

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

