app.controller('ScoreListController', function ($scope, $rootScope, mapService, ScoreService) {

    $scope.category = ScoreService.getDistrictScore;
    $scope.currentDistrict = mapService.currentDistrict;
    $scope.calculateDistrictScore = ScoreService.calculateDistrictScore;
    $scope.catListCount = 1;

    $scope.round = function( value ){
        return Math.round(value);
    }

//    $.getJSON("data/categoryParsed.json", function(json) {
//        console.log(json);
//
//        $scope.category = json;
//        $scope.$apply();
//    });

});

app.factory('ScoreService', function($rootScope){
    var scoreService = {};

    scoreService.init = function (mapDistricts){
        var districts = {};

        for(var i in mapDistricts){
            var category = mapDistricts[i].scores;

            districts[mapDistricts[i].name] = {
                categoryScores: category,
                name: mapDistricts[i].name
            };
        }

        console.log(districts);

        scoreService.defaultCategoryScores = category;

        scoreService.districts = districts;
        $rootScope.$apply();
    };

    scoreService.init2 = function (mapDistricts){
        $.getJSON("data/categoryParsed.json", function(json) {
            var districts = {};



            for(var i in mapDistricts){
                var category = jQuery.extend(true, {}, json);

                districts[mapDistricts[i].name] = {
                    categoryScores: category,
                    name: mapDistricts[i].name
                };
            }

            console.log(districts);

            scoreService.defaultCategoryScores = category;

            scoreService.districts = districts;
            $rootScope.$apply();
        });

    };

    scoreService.getDistrictScore = function (name){
        if(name == null){
            return scoreService.defaultCategoryScores;
        }else
            return scoreService.districts[name].categoryScores;
    };

    scoreService.calculateEventScoreNormalized = function(){
        var maxScore = 0;
        var minScore = 0;

        for(var i in scoreService.districts){
            var district = scoreService.districts[i];
            var score = district.categoryScores["Category 3: Culture & Environment"].subcategory["Cultural availability"].score;

            maxScore = Math.max(score, maxScore);
            minScore = Math.min(score, minScore);
        }

//        console.log(maxScore);
//        console.log(minScore);


        for(var i in scoreService.districts){
            var district = scoreService.districts[i];
            var score = district.categoryScores["Category 3: Culture & Environment"].subcategory["Cultural availability"].score;

            score = ((score - minScore)/(maxScore - minScore))*10;
            district.categoryScores["Category 3: Culture & Environment"].subcategory["Cultural availability"].score = score;
            //console.log(score);
        }
    }

    scoreService.calculateCrimeScoreNormalize = function(){
        var maxScore = 0;
        var minScore = 0;

        for(var i in scoreService.districts){
            var district = scoreService.districts[i];
            var score = district.categoryScores["Category 1: Stability"].subcategory["Prevalence of petty crime"].score;

            maxScore = Math.max(score, maxScore);
            minScore = Math.min(score, minScore);
        }



        for(var i in scoreService.districts){
            var district = scoreService.districts[i];
            var score = district.categoryScores["Category 1: Stability"].subcategory["Prevalence of petty crime"].score;

            score = 10-((score - minScore)/(maxScore - minScore))*10;
            district.categoryScores["Category 1: Stability"].subcategory["Prevalence of petty crime"].score = score;

        }
    }

    scoreService.standardize = function(scores){
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


    scoreService.calculateCrimeScoreStandardize = function(){

        var calcCrimeRate = [];
        var calcAvgCrimeRatings = [];
        for(var i in scoreService.districts){
            var district = scoreService.districts[i];
            var scoreObj = district.categoryScores["Category 1: Stability"].subcategory["Prevalence of petty crime"];

            calcCrimeRate.push({name: district.name,
                score: scoreObj.crimeRate});

            calcAvgCrimeRatings.push({name: district.name,
                score: scoreObj.averageCrimeRatings});
        }

        var stdCrimeRate = scoreService.standardize(calcCrimeRate);
        var stdAvgCrimeRatings = scoreService.standardize(calcAvgCrimeRatings);


        for(var i in scoreService.districts){
            var district = scoreService.districts[i];

            district.categoryScores["Category 1: Stability"].subcategory["Prevalence of petty crime"].score =
                .5 * (5 + stdCrimeRate[district.name]) + .5 * (5 + stdAvgCrimeRatings[district.name]);

            //console.log(district.name + ": " + district.categoryScores["Category 1: Stability"].subcategory["Prevalence of petty crime"].score);
        }


    }

    scoreService.calculateEventScoreStandardize = function(){

        var calcEventRate = [];
        for(var i in scoreService.districts){
            var district = scoreService.districts[i];
            var scoreObj =  district.categoryScores["Category 3: Culture & Environment"].subcategory["Cultural availability"];

            calcEventRate.push({name: district.name,
                score: scoreObj.eventRate});

        }

        var stdEventRate = scoreService.standardize(calcEventRate);


        for(var i in scoreService.districts){
            var district = scoreService.districts[i];

            district.categoryScores["Category 3: Culture & Environment"].subcategory["Cultural availability"].score =
                5 + stdEventRate[district.name];

            console.log(district.name + ": " + district.categoryScores["Category 3: Culture & Environment"].subcategory["Cultural availability"].score);
        }


    }

    scoreService.calculateDistrictScore = function(name){
        if( name == null)
            return 0;

        if(scoreService.districts[name].score){
            return scoreService.districts[name].score;
        }

        var score = 0;

        var totalWeight = 0;
        for(var i in scoreService.districts[name].categoryScores){
            var category = scoreService.districts[name].categoryScores[i];
            totalWeight += category.weight;
        }

        for(var i in scoreService.districts[name].categoryScores){
            var category = scoreService.districts[name].categoryScores[i];
            var subcategoryScore = scoreService.calculateCategoryScore(name,i);


            category.calcWeight = category.weight/totalWeight;

            if(category.calcWeight){
                score += subcategoryScore * category.calcWeight;//category.weight;
            }


            category.calcScore = subcategoryScore * category.calcWeight;
        }

        scoreService.districts[name].score = score;


        return score;
    }

    scoreService.calculateCategoryScore = function(districtName, categoryName){
        if( name == null)
            return 0;


        var score = 0;

        var totalWeight = 0;
        for(var i in scoreService.districts[districtName].categoryScores[categoryName].subcategory){
            var category = scoreService.districts[districtName].categoryScores[categoryName].subcategory[i];
            totalWeight += category.weight;
        }

        for(var i in scoreService.districts[districtName].categoryScores[categoryName].subcategory){
            var category = scoreService.districts[districtName].categoryScores[categoryName].subcategory[i];

            category.calcWeight = category.weight/totalWeight;
            category.calcScore = category.score * category.calcWeight;
            score += category.score * category.calcWeight;//category.weight;
        }

        return score;
    }

    return scoreService;

});

app.factory('DataService', function($rootScope){
    var dataService = {};

    dataService.getDataByDistrict = function (dataName, districtName, data, skip, returnFunction){

        dpd[dataName].get({district: districtName, $skip: skip, $limit: 200},function(result, error){
            if(result.length > 0 ){
                data = data.concat(result);
                dataService.getDataByDistrict(dataName, districtName, data, skip+200, returnFunction);
            }else{
                returnFunction(data);
            }
        });
    };


    return dataService;
});

app.controller('SearchController', function ($scope, $rootScope, $location, mapService) {

    //$rootScope.searchResult = {};
    $scope.searchText = "";
    $scope.searchType = "foods";

    $scope.$watch('searchType', function() {
        $rootScope.searchType = $scope.searchType;
        //$rootScope.$apply();
    });

    $scope.search = function(e){
        if($scope.searchText == ""){
            mapService.setHeatMap($rootScope.foodData);
            return false;
        }

        //console.log($scope.searchType);

        dpd[$scope.searchType].get({name: {$regex: $scope.searchText, $options: 'i' }},function(result, error){
            $rootScope.searchResult = result;

            console.log($rootScope.searchResult);

            var filteredData = [];

            for(var i= 0; i< result.length;i++){
                var item = result[i];
                var rating = item.rating != null && item.rating/10 || .5;

                filteredData.push({lat: item.location[1],
                    lon: item.location[0],
                    value: 1,
                    name: item.name});
            }

            if( filteredData.length > 0){
                mapService.setSearchHeatMap(filteredData);
            }


            $location.path( "/list" );
            $rootScope.$apply();
        });

        e.preventDefault();

        return false;
    };
});

app.controller('ListViewController', function ($scope, $rootScope, mapService, $location) {

    $scope.roundRatings = function (rating){
        return rating !== null && (Math.round(rating * 10) / 10) || null;
    }

    $scope.locate = function (item){
        mapService.locate({lat: item.location[1], lng: item.location[0]}, item.name);
        $location.path( "/map" );
    };

});

app.controller('ItemController', function ($scope, $rootScope, $routeParams, $location, mapService) {

    $scope.item = {};

    dpd[$rootScope.searchType].get($routeParams.id,function(result, error){
        $scope.item = result;
        $scope.$apply();

        console.log($scope.item);
    });

    $scope.locate = function (){
        mapService.locate({lat: $scope.item.location[1], lng: $scope.item.location[0]}, $scope.item.name);
        $location.path( "/map" );
    };

    $scope.roundRatings = function (rating){
        return rating !== null && (Math.round(rating * 10) / 10) || null;
    }

});
