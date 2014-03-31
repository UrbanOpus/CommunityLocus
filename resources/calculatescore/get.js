setWait(true);

dpd.district.get({$fields: {name: 1, population: 1, scores: 1}, },function(districts){
    var numCalculations = {num: 0};

    for(var i in districts){
        var district = districts[i];
        numCalculations.num++;
        CalculateFoodScore(district,  numCalculations);
        
        numCalculations.num++;
        CalculateSchoolScore(district,  numCalculations);
    }
});

function UploadScore(district, numCalculations){
    //console.log(numCalculations.num);
    if(numCalculations.num == 0){
        dpd.district.put(district.id,{scores: district.scores}, function(result, err){
            done(err, result);
        });
    }
}

function CalculateSchoolScore (district, numCalculations){
    dpd.schools.get({district: district.name},function(result, error){
        var sumRatings = 0;
        for(var i= 0; i< result.length;i++){
            var item = result[i];
            var rating = item.rating !== null && item.rating/10 || 0.5;

            sumRatings += rating;
            schoolData.push({lat: item.location[1],
                lon: item.location[0],
                value: rating});

            var marker = new L.marker([item.location[1], item.location[0]], { title: item.name});
            marker.bindPopup(item.name + "<br>Rating: " + item.rating + "<br>Ranking: " + item.rank);

            schoolMarkerLayer.addLayer(marker);
        }

        if(result.length == 0){
            district.scores["Category 4: Education"].subcategory["Public education indicators"].score = 0;
        }else{
            district.scores["Category 4: Education"].subcategory["Public education indicators"].score =
                Math.min((sumRatings*10/result.length) + result.length,10);
        }

        //console.log(district.name + ": " + sumRatings/ratingCount)
        numCalculations.num--;
        UploadScore(district, numCalculations);
    });
}

function CalculateFoodScore (district, numCalculations){
    dpd.foods.get({district: district.name},function(result, error){
        var sumRatings = 0;
        var ratingCount = 0;

        for(var i= 0; i< result.length;i++){

            var item = result[i];

            //if(item.location[1] != null && item.location[0] != null){
            var rating = item.rating != null && item.rating/10 || .5;
            sumRatings += item.rating != null && item.rating || 0;
            ratingCount += item.rating != null && 1 || 0;
        }

        district.scores["Category 3: Culture & Environment"].subcategory["Food and drink"].score =
            sumRatings/ratingCount;

        //console.log(district.name + ": " + sumRatings/ratingCount)
        numCalculations.num--;
        UploadScore(district, numCalculations);
    });
}