setWait(true);

dpd.district.get({$fields: {name: 1, population: 1, scores: 1}, },function(districts){

    var numCalculations = {num: 0};

    for(var i in districts){
        //var district = districts[i];
        CalculateDistrictScore(districts, i, numCalculations);
    }
});

function CalculateDistrictScore(districts, index, numCalculations){

    numCalculations.num++;
    CalculateFoodScore(districts, index, numCalculations);

    numCalculations.num++;
    CalculateSchoolScore(districts, index, numCalculations);

    numCalculations.num++;
    CalculateEventScore(districts, index, numCalculations);

    numCalculations.num++;
    CalculateCrimeScore(districts, index, numCalculations);
}

function UploadScore(districts, numCalculations){
    //console.log(numCalculations.num);
    if(numCalculations.num == 0){
        for(var i in districts){
            var district = districts[i];

            calculateCrimeScoreStandardized(districts);
            calculateEventScoreNormalized(districts);

            var districtScore = calculateDistrictScore(district);

            dpd.district.put(district.id,{scores: district.scores, totalscore: districtScore});            
        }
        
        request({uri: "http://localhost:2403/datahub-uploaddata/", method: "GET"});
        done(null, "Done calculation");
    }
}

function CalculateSchoolScore (districts, index, numCalculations){
    var district = districts[index];
    dpd.schools.get({district: district.name},function(result, error){
        var sumRatings = 0;
        for(var i= 0; i< result.length;i++){
            var item = result[i];
            var rating = item.rating/10;

            sumRatings += rating;
        }

        var schoolScore = district.scores["Category 4: Education"].subcategory["Public education indicators"];

        if(result.length == 0){
            schoolScore.score = 0;
        }else{
            schoolScore.score =
                Math.min((sumRatings*10/result.length) + result.length,10);
        }

        schoolScore.calcDesc =
            "Formula: AvgSchoolRatings + numSchools\n"
                + "Number of Schools: " + result.length + "\n"
                + "Average School Ratings: " + (sumRatings*10/result.length).toFixed(2) + "\n";


        //console.log(district.name + ": " + sumRatings/ratingCount)
        numCalculations.num--;
        UploadScore(districts, numCalculations);
    });
}

function CalculateFoodScore (districts, index, numCalculations){
    var district = districts[index];

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

        var foodScore = district.scores["Category 3: Culture & Environment"].subcategory["Food and drink"];
        foodScore.score = sumRatings/ratingCount;

        foodScore.ratingCount = ratingCount;

        foodScore.calcDesc =
            "Formula: (sumRatings)/(NumVendors)\n"
                + "Sum Ratings: " + sumRatings.toFixed(2) + "\n"
                + "Number of Vendors: " + ratingCount + "\n";

        //console.log(district.name + ": " + sumRatings/ratingCount)
        numCalculations.num--;
        UploadScore(districts, numCalculations);
    });
}

function CalculateEventScore (districts, index, numCalculations){
    var district = districts[index];

    dpd.events.get({district: district.name},function(result, error){
        var eventScore = district.scores["Category 3: Culture & Environment"].subcategory["Cultural availability"];
        eventScore.score =
            (result.length/district.population)*1000;

        eventScore.eventRate = (result.length/district.population)*1000;

        eventScore.calcDesc =
            "Formula: standardized (NumEvents / districtPopulation)\n"
                + "Number of Events: " + result.length + "\n"
                + "District Population: " + district.population + "\n";

        numCalculations.num--;
        UploadScore(districts, numCalculations);
    });
}

function calculateEventScoreNormalized(districts){
    var maxScore = 0;
    var minScore = 0;

    for(var i in districts){
        var district = districts[i];
        var score = district.scores["Category 3: Culture & Environment"].subcategory["Cultural availability"].score;

        maxScore = Math.max(score, maxScore);
        minScore = Math.min(score, minScore);
    }

    for(var i in districts){
        var district = districts[i];
        var score = district.scores["Category 3: Culture & Environment"].subcategory["Cultural availability"].score;

        score = ((score - minScore)/(maxScore - minScore))*10;
        district.scores["Category 3: Culture & Environment"].subcategory["Cultural availability"].score = score;
        //console.log(score);
    }
}

function CalculateCrimeScore (districts, index, numCalculations){
    var district = districts[index];

    getDataByDistrict("crime", district.name, [], 0, function(result){
        var sumRatings = 0;
        for(var i= 0; i< result.length;i++){
            var item = result[i];
            var rating = item.rating;

            sumRatings += rating;
        }

        var crimeScore = district.scores["Category 1: Stability"].subcategory["Prevalence of petty crime"];

        crimeScore.score = 1/(result.length/district.population);


        crimeScore.averageCrimeRatings = 5-(sumRatings/result.length);
        crimeScore.crimeRate = 1/(result.length/district.population);

        crimeScore.calcDesc =
            "Formula: .5 * standardizedAvgCrimeRatings + .5 * standardizedCrimeRate\n"
                + "Average Crime Ratings: " + crimeScore.averageCrimeRatings.toFixed(2) + "\n"
                + "Crime Rate: " + crimeScore.crimeRate.toFixed(2) + "\n";

        numCalculations.num--;
        UploadScore(districts, numCalculations);
    });
}

function calculateCrimeScoreNormalized(districts){
    var maxScore = 0;
    var minScore = 0;

    for(var i in districts){
        var district = districts[i];
        var score = district.scores["Category 1: Stability"].subcategory["Prevalence of petty crime"].score;

        maxScore = Math.max(score, maxScore);
        minScore = Math.min(score, minScore);
    }

    for(var i in districts){
        var district = districts[i];
        var score = district.scores["Category 1: Stability"].subcategory["Prevalence of petty crime"].score;

        score = 10-((score - minScore)/(maxScore - minScore))*10;
        district.scores["Category 1: Stability"].subcategory["Prevalence of petty crime"].score = score;
    }
}

function standardize(scores){
    var average = 0;
    var sumScore = 0;
    var numItems = 0;

    for(var i in scores){
        var score = scores[i].score;

        sumScore += score;
        numItems += 1;
    }

    average = sumScore/numItems;

    var sumDiffSqr = 0;
    var stdev = 0;

    for(var i in scores){
        var score = scores[i].score;

        sumDiffSqr += Math.pow((score - average),2);
    }
    stdev = Math.sqrt(sumDiffSqr/(numItems-1));

    var retScores = {};
    for(var i in scores){
        var score = scores[i].score;

        retScores[scores[i].name] = (score - average)/stdev;
    }

    return retScores;
}


function calculateCrimeScoreStandardized(districts){

    var calcCrimeRate = [];
    var calcAvgCrimeRatings = [];
    for(var i in districts){
        var district = districts[i];
        var scoreObj = district.scores["Category 1: Stability"].subcategory["Prevalence of petty crime"];

        calcCrimeRate.push({name: district.name,
            score: scoreObj.crimeRate});

        calcAvgCrimeRatings.push({name: district.name,
            score: scoreObj.averageCrimeRatings});
    }

    var stdCrimeRate = standardize(calcCrimeRate);
    var stdAvgCrimeRatings = standardize(calcAvgCrimeRatings);


    for(var i in districts){
        var district = districts[i];

        district.scores["Category 1: Stability"].subcategory["Prevalence of petty crime"].score =
            .5 * (5 + stdCrimeRate[district.name]) + .5 * (5 + stdAvgCrimeRatings[district.name]);

    }
}

function calculateDistrictScore(district){

    var score = 0;

    var totalWeight = 0;
    for(var i in district.scores){
        var category = district.scores[i];
        totalWeight += category.weight;
    }

    for(var i in district.scores){
        var category = district.scores[i];
        var subcategoryScore = calculateCategoryScore(district, i);


        category.calcWeight = category.weight/totalWeight;

        if(category.calcWeight){
            score += subcategoryScore * category.calcWeight;//category.weight;
        }


        category.calcScore = subcategoryScore * category.calcWeight;
    }

    district.score = score;

    return score;
}

function calculateCategoryScore(district, categoryName){
    var score = 0;

    var totalWeight = 0;
    for(var i in district.scores[categoryName].subcategory){
        var category = district.scores[categoryName].subcategory[i];
        totalWeight += category.weight;
    }

    for(var i in district.scores[categoryName].subcategory){
        var category = district.scores[categoryName].subcategory[i];

        category.calcWeight = category.weight/totalWeight;
        category.calcScore = category.score * category.calcWeight;
        score += category.score * category.calcWeight;//category.weight;
    }

    return score;
}

function getDataByDistrict(dataName, districtName, data, skip, returnFunction){

    dpd[dataName].get({district: districtName, $skip: skip, $limit: 200},function(result, error){
        if(result.length > 0 ){
            data = data.concat(result);
            getDataByDistrict(dataName, districtName, data, skip+200, returnFunction);
        }else{
            returnFunction(data);
        }
    });
};