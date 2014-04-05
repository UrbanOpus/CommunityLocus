app.factory('mapService', function($rootScope, $http, $route, $location, ScoreService, DataService){

    var map = {};

    map.init = function(){

        map.currentDistrict = null;

        var mapView = map.mapView = L.map('map');

        var cloudmade = new L.tileLayer('http://{s}.tile.cloudmade.com/ce9a6b23b4b64c9daaa15b3f93c314e2/997/256/{z}/{x}/{y}.png', {
            //attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery � <a href="http://cloudmade.com">CloudMade</a>',
            maxZoom: 18
        });
        mapView.addLayer(cloudmade);
        //JSON.parse(document.body.textContent)

        var searchHeatmapLayer = L.TileLayer.heatMap({
            // radius could be absolute or relative
            // absolute: radius in meters, relative: radius in pixels
            radius: { value: 100, absolute: true },
            //radius: { value: 20, absolute: false },
            opacity: 0.8,
            gradient: {
                0.45: "rgb(0,0,255)",
                0.55: "rgb(0,255,255)",
                0.65: "rgb(0,255,0)",
                0.95: "yellow",
                1.0: "rgb(255,0,0)"
            }
        });


        var foodHeatmapLayer = L.TileLayer.heatMap({
            // radius could be absolute or relative
            // absolute: radius in meters, relative: radius in pixels
            radius: { value: 100, absolute: true },
            //radius: { value: 20, absolute: false },
            opacity: 0.8,
            gradient: {
                0.45: "rgb(0,0,255)",
                0.55: "rgb(0,255,255)",
                0.65: "rgb(0,255,0)",
                0.95: "yellow",
                1.0: "rgb(255,0,0)"
            }
        });

        var schoolHeatmapLayer = L.TileLayer.heatMap({
            // radius could be absolute or relative
            // absolute: radius in meters, relative: radius in pixels
            radius: { value: 100, absolute: true },
            //radius: { value: 20, absolute: false },
            opacity: 0.8,
            gradient: {
                0.45: "rgb(0,0,255)",
                0.55: "rgb(0,255,255)",
                0.65: "rgb(0,255,0)",
                0.95: "yellow",
                1.0: "rgb(255,0,0)"
            }
        });

        var crimeHeatmapLayer = L.TileLayer.heatMap({
            // radius could be absolute or relative
            // absolute: radius in meters, relative: radius in pixels
            radius: { value: 100, absolute: true },
            //radius: { value: 20, absolute: false },
            opacity: 0.8,
            gradient: {
                0.45: "rgb(0,0,255)",
                //0.55: "rgb(0,255,255)",
                0.65: "purple",
                //0.95: "yellow",
                1.0: "black"
            }
        });

        var eventHeatmapLayer = L.TileLayer.heatMap({
            // radius could be absolute or relative
            // absolute: radius in meters, relative: radius in pixels
            radius: { value: 100, absolute: true },
            //radius: { value: 20, absolute: false },
            opacity: 0.8,
            gradient: {
                0.45: "rgb(0,0,255)",
                0.55: "rgb(0,255,255)",
                0.65: "rgb(0,255,0)",
                0.95: "yellow",
                1.0: "rgb(255,0,0)"
            }
        });

        var foodMarkerLayer = new L.markerClusterGroup({showCoverageOnHover: false});
        var eventMarkerLayer = new L.markerClusterGroup({showCoverageOnHover: false});
        var crimeMarkerLayer = new L.markerClusterGroup({showCoverageOnHover: false});
        var schoolMarkerLayer = new L.markerClusterGroup({showCoverageOnHover: false});

        var searchMarkerLayer = new L.markerClusterGroup({showCoverageOnHover: false});

        var districtLayer = new L.LayerGroup();

        var heatmapsLayer = new L.LayerGroup();
        var markerLayer = new L.LayerGroup();


        map.searchHeatmapLayer = searchHeatmapLayer;
        map.searchMarkerLayer = searchMarkerLayer;

        var searchLayer = new L.LayerGroup();
        searchLayer.addLayer(searchHeatmapLayer);
        searchLayer.addLayer(searchMarkerLayer);

        var foodLayer = new L.LayerGroup();
        foodLayer.addLayer(foodHeatmapLayer);
        foodLayer.addLayer(foodMarkerLayer);

        var crimeLayer = new L.LayerGroup();
        crimeLayer.addLayer(crimeHeatmapLayer);
        crimeLayer.addLayer(crimeMarkerLayer);

        var eventLayer = new L.LayerGroup();
        eventLayer.addLayer(eventHeatmapLayer);
        eventLayer.addLayer(eventMarkerLayer);

        var schoolLayer = new L.LayerGroup();
        schoolLayer.addLayer(schoolHeatmapLayer);
        schoolLayer.addLayer(schoolMarkerLayer);

        var baseMaps = {
           // 'Foods': foodLayer,
            //'Schools': schoolLayer,
           // 'Crimes': crimeLayer,
           // 'Evnets': eventLayer
           // 'Heatmap': heatmapsLayer,
           // 'Markers': markerLayer
        }


        var overlayMaps = {

            'Districts': districtLayer,
           //'Markers': markerLayer

            'Foods Heatmap': foodHeatmapLayer,
            'Foods Marker': foodMarkerLayer,

            'Schools Heatmap': schoolHeatmapLayer,
            'Schools Marker': schoolMarkerLayer,

            'Crimes Heatmap': crimeHeatmapLayer,

            'Events Heatmap': eventHeatmapLayer,
            'Events Marker': eventMarkerLayer,

            'Search Heatmap': searchHeatmapLayer,
            'Search Marker': searchMarkerLayer
        };

        var controls = L.control.layers(baseMaps, overlayMaps, {collapsed: true}).setPosition('bottomright');
        controls.addTo(map.mapView);

        //mapView.addLayer(heatmapsLayer);
        mapView.addLayer(districtLayer);
        //mapView.addLayer(markerLayer);

        heatmapsLayer.addLayer(foodHeatmapLayer);
        heatmapsLayer.addLayer(schoolHeatmapLayer);
        heatmapsLayer.addLayer(crimeHeatmapLayer);
        heatmapsLayer.addLayer(eventHeatmapLayer);

        heatmapsLayer.addLayer(searchHeatmapLayer);

        markerLayer.addLayer(foodMarkerLayer);
        markerLayer.addLayer(schoolMarkerLayer);
        markerLayer.addLayer(eventMarkerLayer);
        markerLayer.addLayer(crimeMarkerLayer);

        markerLayer.addLayer(searchMarkerLayer);

//        mapView.on( "zoomend", function( e ) {
//            if (mapView.getZoom()>13) {
//                mapView.removeLayer(heatmapsLayer);
//                mapView.removeLayer(districtLayer);
//                mapView.removeLayer(markerLayer);
//            }
//            else if (mapView.getZoom()<14) {
//                mapView.addLayer(districtLayer);
//            };
//        });

        map.myIcon = L.icon({
            iconUrl: 'plugins/leaflet/images/my-cast.png',
            shadowUrl: 'plugins/leaflet/images/marker-shadow.png',
            iconAnchor: [17, 34],
            shadowAnchor: [7, 44],
            popupAnchor:  [0, -34]
        });


        var geojson;

        function getColor(d) {
            return d > 100 ? '#800026' :
                d > 90  ? '#BD0026' :
                    d > 80  ? '#E31A1C' :
                        d > 70  ? '#FC4E2A' :
                            d > 50   ? '#FD8D3C' :
                                d > 30   ? '#FEB24C' :
                                    d > 10   ? '#FED976' :
                                        '#FFEDA0';
        }

        function style(feature) {
            return {
                fillColor:  getColor(feature.properties.density),
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            };
        }

        function highlightFeature(e) {
            var layer = e.target;

            info.update(layer.feature.properties);

            if( map.currentDistrict != layer.feature.properties.name ){


            layer.setStyle({
                weight: 5,
                color: '#666',
                dashArray: '',
                fillOpacity: 0.5
            });

            if (!L.Browser.ie && !L.Browser.opera) {
                layer.bringToFront();
            }
            }
        }

        function resetHighlight(e) {

            var layer = e.target;

            info.update();

            if( map.currentDistrict != layer.feature.properties.name ){
            geojson.resetStyle(e.target);
            }
        }

        function zoomToFeature(e) {

            var layer = e.target;

            layer.setStyle({
                weight: 5,
                color: '#666',
                dashArray: '',
                fillOpacity: 0.1
            });

            if(map.currentLayer){
            geojson.resetStyle(map.currentLayer);
            }

            info.update();

            map.mapView.fitBounds(e.target.getBounds());
//            var latDiff = e.target.getBounds()._northEast.lat - e.target.getBounds()._southWest.lat;
//            var longDiff = e.target.getBounds()._northEast.lng - e.target.getBounds()._southWest.lng;
            var northEast = e.target.getBounds()._northEast
            var center = e.target.getBounds().getCenter();
            var radius = getDistanceFromLatLon(center.lat,center.lng,northEast.lat,northEast.lng);

            map.myPos.setLatLng(center);
            map.myPosCircle.setLatLng(center);
            map.myPosCircle.setRadius(radius);

            map.currentDistrict = layer.feature.properties.name;
            map.currentLayer = layer;


        }

        var districtNames = [];

//        $.getJSON("data/crimedata.json", function(json) {
//            console.log(json);
//
//        });

        dpd.district.get(function(districts, error) {

            map.districts = districts;
            ScoreService.init(districts);


            var filteredData = [];
            var foodDataCount = 0;

            var crimeData = [];
            var crimeDataCount = 0;

            var schoolData = [];
            var schoolDataCount = 0;

            var eventData = [];
            var eventDataCount = 0;

            //crimeLayer.setData(crimeData);

            for(var i in districts){

                var cDistrict = districts[i];
                var feature = L.geoJson(districts[i].geojson, {
                    style: style,
                    onEachFeature: function onEachFeature(feature, layer) {
                        layer.on({
                            mouseover: highlightFeature,
                            mouseout: resetHighlight,
                            click: zoomToFeature
                        });


                        feature.properties.population = cDistrict.population;

                        foodDataCount++;
                        DataService.getDataByDistrict("foods", cDistrict.name, [], 0, function(result){
                            var sumRatings = 0;
                            var ratingCount = 0;

                            for(var i= 0; i< result.length;i++){

                                var item = result[i];

                                //if(item.location[1] != null && item.location[0] != null){
                                var rating = item.rating != null && item.rating/10 || .5;
                                sumRatings += item.rating != null && item.rating || 0;
                                ratingCount += item.rating != null && 1 || 0;

                                filteredData.push({lat: item.location[1],
                                    lon: item.location[0],
                                    value: rating});

                                var marker = new L.marker([item.location[1], item.location[0]], { title: item.name});
                                marker.bindPopup(item.name + "<br>Rating: " + item.rating);

                                foodMarkerLayer.addLayer(marker);
                            }

                            //feature.properties.density = Math.round((sumRatings/ratingCount)*10)/10;


                            var foodScore = ScoreService.districts[feature.properties.name].categoryScores["Category 3: Culture & Environment"].subcategory["Food and drink"];
                                foodScore.score = sumRatings/ratingCount;

                            foodScore.ratingCount = ratingCount;

                            foodScore.calcDesc =
                                    "Formula: (sumRatings)/(NumVendors)\n"
                                    + "Sum Ratings: " + sumRatings.toFixed(2) + "\n"
                                    + "Number of Vendors: " + ratingCount + "\n";

                            //console.log(ScoreService.districts[feature.properties.name].categoryScores["Category 3: Culture & Environment"].subcategory["Food and drink"].score);


                            foodDataCount--;
                            if( foodDataCount == 0){
                                foodHeatmapLayer.setData(filteredData);

                                $rootScope.foodData = filteredData;
                            }
                        });

                        crimeDataCount++;
                        DataService.getDataByDistrict("crime", cDistrict.name, [], 0, function(result){

                            if(result !== null){

                                var sumRatings = 0;
                                for(var i= 0; i< result.length;i++){
                                    var item = result[i];
                                    var rating = item.rating;

                                    sumRatings += rating;
                                    crimeData.push({lat: item.location[1],
                                        lon: item.location[0],
                                        value: rating/5});

                                }

                                var crimeScore = ScoreService.districts[feature.properties.name].categoryScores["Category 1: Stability"].subcategory["Prevalence of petty crime"];

                                crimeScore.score =
                                    //Math.max(10-(((sumRatings/result.length) * result.length)/feature.properties.population)*1000,0);
                                    //Math.max(10-(result.length/feature.properties.population)*1000,0);
                                    //result.length/feature.properties.population;
                                //    .5 * 1/(sumRatings/feature.properties.population)
                                    1/(result.length/feature.properties.population);


                                crimeScore.averageCrimeRatings = 5-(sumRatings/result.length);
                                crimeScore.crimeRate = 1/(result.length/feature.properties.population);

                                crimeScore.calcDesc =
                                    "Formula: .5 * standardizedAvgCrimeRatings + .5 * standardizedCrimeRate\n"
                                        + "Average Crime Ratings: " + crimeScore.averageCrimeRatings.toFixed(2) + "\n"
                                        + "Crime Rate: " + crimeScore.crimeRate.toFixed(2) + "\n";

                                //console.log(1/(sumRatings/feature.properties.population));
                                //console.log(feature.properties.name + ": " + sumRatings*1000/feature.properties.population);


                                crimeDataCount--;
                                if( crimeDataCount == 0){
                                    crimeHeatmapLayer.setData(crimeData);
                                    $rootScope.crimeData = crimeData;

                                    ScoreService.calculateCrimeScoreNormalize();
                                    //ScoreService.calculateCrimeScoreStandardize();
                                }

                            }
                        });

                        schoolDataCount++;
                        DataService.getDataByDistrict("schools", cDistrict.name, [], 0, function(result){

                            if(result !== null){

                                var sumRatings = 0;
                                for(var i= 0; i< result.length;i++){
                                    var item = result[i];
                                    var rating = item.rating != null && item.rating/10 || .5;

                                    sumRatings += rating;
                                    schoolData.push({lat: item.location[1],
                                        lon: item.location[0],
                                        value: rating});

                                    var marker = new L.marker([item.location[1], item.location[0]], { title: item.name});
                                    marker.bindPopup(item.name + "<br>Rating: " + item.rating + "<br>Ranking: " + item.rank);

                                    schoolMarkerLayer.addLayer(marker);
                                }

                                var schoolScore = ScoreService.districts[feature.properties.name].categoryScores["Category 4: Education"].subcategory["Public education indicators"];

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

                                schoolDataCount--;
                                if( schoolDataCount == 0){
                                    schoolHeatmapLayer.setData(schoolData);
                                    $rootScope.schoolData = schoolData;
                                }

                            }
                        });

                        eventDataCount++;
                        DataService.getDataByDistrict("events", cDistrict.name, [], 0, function(result){

                            if(result !== null){

                                for(var i= 0; i< result.length;i++){
                                    var item = result[i];
                                    //var rating = item.rating != null && item.rating/10 || .5;

                                    eventData.push({lat: item.location[1],
                                        lon: item.location[0],
                                        value: 1});

                                    var marker = new L.marker([item.location[1], item.location[0]], { title: item.name })
                                    marker.bindPopup(item.name);

                                    eventMarkerLayer.addLayer(marker);
                                }

                                var eventScore = ScoreService.districts[feature.properties.name].categoryScores["Category 3: Culture & Environment"].subcategory["Cultural availability"];
                                eventScore.score =
                                    (result.length/feature.properties.population)*1000;

                                eventScore.eventRate = (result.length/feature.properties.population)*1000;

                                eventScore.calcDesc =
                                    "Formula: standardized (NumEvents / districtPopulation)\n"
                                        + "Number of Events: " + result.length + "\n"
                                        + "District Population: " + feature.properties.population + "\n";

                                eventDataCount--;
                                if( eventDataCount == 0){
                                    eventHeatmapLayer.setData(eventData);
                                    $rootScope.eventData = eventData;

                                    ScoreService.calculateEventScoreNormalized();
                                }

                            }
                        });

                        function setDistrictLivabilityScore (){

                            if(foodDataCount != 0 || crimeDataCount != 0 || schoolDataCount != 0 || eventDataCount != 0) {
                                setTimeout(setDistrictLivabilityScore, 200);
                                return;
                            }
                            feature.properties.density = Math.round(ScoreService.calculateDistrictScore(feature.properties.name)*10);
                            geojson.resetStyle(layer);
                        }

                        setDistrictLivabilityScore();
                    }
                });

                geojson = feature.addTo(districtLayer);

            }



            //console.log(result);
        });


        var info = L.control();

        info.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
            this.update();
            return this._div;
        };

        // method that we will use to update the control based on feature properties passed
        info.update = function (props) {
            this._div.innerHTML = '<h4>Livability Score</h4>' +  (props ?
                '<b>' + props.name + '</b><br />' + props.density + ' Community Score'
                : 'Hover over a district');
        };

        info.addTo(map.mapView);





        var cookieMyPos = JSON.parse(localStorage.getItem('myPos'));

        //console.log("myPosCookie", cookieMyPos);

        if(cookieMyPos && cookieMyPos.location){

            var latlng = new L.LatLng(cookieMyPos.location[1], cookieMyPos.location[0]);
            var zoom = JSON.parse(localStorage.getItem('zoom'));
            var radius = cookieMyPos.radius;

            if(zoom === undefined)
                zoom = 12;

//            console.log("Zoom", zoom);

            console.log("Got previous Geolocation from cookie.");

            mapView.setView(latlng, zoom);
            mapViewSetup(latlng, 9000, radius);
        }


        setTimeout(function(){
            if(map.mapInitComplete)
                return;
            mapView.locate({setView: true, timeout: 3000/*,enableHighAccuracy: true, watch: true*/});
        },2000);

        setTimeout(locationErrorSetup,4000);

        mapView.on('locationerror', function(e){
            console.log("Location Error");
            locationErrorSetup();
        });
        mapView.on('locationfound', function(e){

            console.log("Got Geolocation from webkit.");

            if(map.mapInitComplete){
                var radius = e.accuracy / 2;
//
//            map.myPos.setLatLng(e.latlng);
//            map.myPosCircle.setLatLng(e.latlng);
                map.errorCircle.setLatLng(e.latlng);
                map.errorCircle.setRadius(radius);
                return;
            }

            mapViewSetup(e.latlng, e.accuracy);

            if($rootScope.me){

                var LatLng = e.latlng;
                var receiveLocation = [LatLng.lng,LatLng.lat];
                //var receiveRadius = mapService.myPosCircle.getRadius();

                dpd.users.post($rootScope.me.id, {
                    lastReceive: {location: receiveLocation}
                },function(result,error){

                });

            }
        });

        var unbindWatcher = $rootScope.$watch( function () { return $rootScope.me; }, function ( me ) {

            if(map.mapInitComplete)
                return;

            //console.log(me);
            if(me && me.lastReceive){
                var latlng = new L.LatLng($rootScope.me.lastReceive.location[1], $rootScope.me.lastReceive.location[0]);
                var radius = $rootScope.me.lastReceive.radius;

                console.log("Got previous Geolocation from server.");

                mapView.setView(latlng, 12);
                mapViewSetup(latlng, 9000, radius);
            }

            unbindWatcher();
        });

        function locationErrorSetup() {
            if(map.mapInitComplete)
                return;

            $http.get('http://freegeoip.net/json/').success(function(data){
                console.log("Got Geolocation by IP");

                var latlng = new L.LatLng(data.latitude, data.longitude);

                mapView.setView(latlng, 12);
                mapViewSetup(latlng, 9000);
            });
        }

        function mapViewSetup (latlng, accuracy, myRadius){

            var e = {
                accuracy: accuracy,
                latlng: latlng
            };

            var myPosRadius = myRadius;

            if(myRadius === undefined)
                myPosRadius = 9000;

            var radius = e.accuracy / 2;

            map.myPos = new L.marker(e.latlng, {icon: map.myIcon}).bindPopup("You are here!").openPopup();
            map.myPosCircle = L.circle(e.latlng,myPosRadius,{
                fillColor: 'blue',
                fillOpacity: 0.2,
                clickable: false,
                stroke: false
            });

            map.mapInitComplete = true;
            $rootScope.$broadcast('mapInitComplete',map);
        };

    };

    map.setSearchHeatMap = function (data){

        console.log(map.searchHeatmapLayer);
        map.searchHeatmapLayer.setData(data);

        map.searchMarkerLayer.clearLayers();

        for(var i in data){
            var item = data[i];

            var marker = new L.marker([item.lat, item.lon], { title: item.name});
            marker.bindPopup(item.name);

            map.searchMarkerLayer.addLayer(marker);
        }

    };

    map.locate = function (location, name){
//        L.marker(location).addTo(map.mapView);
//        //.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup()
//        map.mapView.setView(location, 17);

//        var marker = new L.marker(location, { title: name});
//        marker.bindPopup(name);
//
//        map.searchMarkerLayer.addLayer(marker);

        map.mapView.setView(location, 17);
    };

    return map;
});

app.controller('MapController', function($scope, $rootScope, $location, $http, mapService, $route) {

    //TODO: Lazy load
    mapService.init();

    $scope.route = $route;

    var map = mapService.mapView;

    mapResize();
    $(window).resize( mapResize );
    function mapResize() {
        $("#map").height($(window).height()-50);
        //$("#map").width($(window).width() *.90 );

        map.invalidateSize();
    }
});

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/math/is-point-in-poly [rev. #0]

function isPointInPoly(poly, pt){
    for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
        ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
            && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
        && (c = !c);
    return c;
}
