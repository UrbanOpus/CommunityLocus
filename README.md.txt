Documentation

localhost:2403/dashboard/
This will link to the deployd dashboard.
You need the key to enter which can be found at .dpd folder in keys.txt or keys.json

Collections
Inside the dashboard, you can create or delete new collections.
In the properties tab, you can add new fields to a collection
To use the deployd api, you can check out the documentation under the API tab.
In the events tab, you can input javascripts to customize your collection rest behaviours.

Events
You can also create new events. Events are just urls that performs specific actions defined by the scripts.
I have several scripts, these scripts can be activated by going to destinated url
localhost:2403/initscores/

DATAHUB-INITDISTRICT - this initalize the districts sensors on urban opus datahub in case you want to modify it
DATAHUB-UPLOADDATA - uploads district scores as well as subcategory scores onto urban opus datahub

INITDISTRICT - initalize the districts based on the json file in CommunityLocus/public/data/districts.json

INITSCORES - inits all districts with a fresh new category from data/categoryParsed.json

INITEVENTS - pull data from Meetup.com into mongodb
INITFOODS - pull data from Foursquare.com into mongodb
INITCRIMES - init the crimes from data/crimes.json
INITSCHOOLS - init the schools from data/schools.json

DELETEALLDATA - this will delete all data from a collection
to use, go to localhost:2403/deletealldata/{collectionName}

CALCULATESCORE - this will calculate the livability score of each district and push the data onto urban opus datahub

INITDATA - this will initalize all data by deleting all data first then recreating them
init data will initalize districts, foods, crimes, events, and schools data

UPDATEDATA - a smaller set version of init data which only updates foods and events data
if you want to start mining script at an interval, call this script at certain interval

WRITETODISK - this will write a given collection to disk as a json file
localhost:2403/writetodisk/{collectionName}

GETDISTRICT - this will output the district name given latitude and longitude
how to use: dpd.getdistrict.get({lat: lat, lon: lon}, function( districtName, error){ //some script

