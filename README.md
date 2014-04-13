## Community Locus

## Deployd Dashboard
localhost:2403/dashboard/
This will link to the deployd dashboard.
You need the key to enter which can be found at .dpd folder in keys.txt or keys.json

### Collections
Inside the dashboard, you can create or delete new collections.
In the properties tab, you can add new fields to a collection
To use the deployd api, you can check out the documentation under the API tab.
In the events tab, you can input javascripts to customize your collection rest behaviours.

### Events and Scripts
You can also create new events. Events are just urls that performs specific actions defined by the scripts.
I have several scripts, these scripts can be activated by going to destinated url
localhost:2403/initscores/

* DATAHUB-INITDISTRICT - this initalize the districts sensors on urban opus datahub in case you want to modify it
* DATAHUB-UPLOADDATA - uploads district scores as well as subcategory scores onto urban opus datahub

* INITDISTRICT - initalize the districts based on the json file in CommunityLocus/public/data/districts.json
* INITSCORES - inits all districts with a fresh new category from data/categoryParsed.json

* INITEVENTS - pull data from Meetup.com into mongodb
* INITFOODS - pull data from Foursquare.com into mongodb
* INITCRIMES - init the crimes from data/crimes.json
* INITSCHOOLS - init the schools from data/schools.json

* DELETEALLDATA - this will delete all data from a collection
  to use, go to localhost:2403/deletealldata/{collectionName}

* CALCULATESCORE - this will calculate the livability score of each district and push the data onto urban opus datahub

* INITDATA - this will initalize all data by deleting all data first then recreating them
  init data will initalize districts, foods, crimes, events, and schools data
* UPDATEDATA - a smaller set version of init data which only updates foods and events data
  if you want to start mining script at an interval, call this script at certain interval

* WRITETODISK - this will write a given collection to disk as a json file
  localhost:2403/writetodisk/{collectionName}

* GETDISTRICT - this will output the district name given latitude and longitude
  how to use: dpd.getdistrict.get({lat: lat, lon: lon}, function( districtName, error){ //some script

* GEOCODE - this will geocode an address in Canada into latitude and longitude
  how to use: dpd["geocode"].get({address: str}, function(location){ //some script
  the return value is an array of [lon, lat]

## Setting up

1. Setup mongodb server
2. Install node
3. Edit server.js, I have uploaded server.js for localhost testing and server2.js for deployment on Heroku as template
You have to edit the mongodb server configuration and also the default server port
4. Run the server by typing "node server.js" in the CommunityLocus folder
5. Deployd should now initalize all the collections into Mongodb, type localhost:2403/initdata into browser to intialize all data
6. Go to localhost:2403 to see the website

## Creating new category

1. edit CommunityLocus/public/data/categoryParsed.json

2. go to url localhost:2403/initscores/ this will insert new category into all district scores json file

3. create a new collection and edit the fields

4. create a new event, you can follow templates like /initfoods
under the on get, write your script to parse and push the data into mongodb
The collection should get the district name by using dpd.getdistrict.get
After you have successfully parsed the data, push it into mongodb by dpd.collectionName.push({jsonfile})

5. calculate the new scores by editing /calculatescores
You can use the food template in calculatescores
You can add in score description by editing the district.scores before pushing onto Mongodb

6. edit mapCtrl.js under public/core/js/
You have to create a new heatmapLayer and a new markerLayer
Add both layer into the overlayMaps
If its static data, you can follow crime/school's template
If its dynamic data, you can follow food/event's template
For each data point, you need to get the data and push the lat, lon, value into the heatmap layer
You also need to push a new marker into markerLayer

7. add search type in public/partials/search.html
and edit public/core/js/scoreCtrl.js under SearchController for any inconsistency
