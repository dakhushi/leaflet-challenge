// Fetching the Data and printing to inspect the Data
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(url).then(function(data){
    console.log(data);
})

//Creating basic layout of the map
//Adding the tile layer
let streetMap =L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Only one base layer can be shown at a time.
let baseMaps = {
    "Street Map": streetMap,
    "Tropographic Map": topo
};

//Add overlay maps

// Creating the map object
let myMap = L.map("map",{
    center: [37.09, -95.71],
    zoom: 5,
    layers:[streetMap] //need to add overlay map option
});

// Pass map layers into our layer control.
// Add the layer control to the map.
L.control.layers(baseMaps).addTo(myMap); //need to add overlayMaps