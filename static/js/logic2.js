//Step 1 // Fetching the data from the USGS API
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(url).then(function (data) {
    // Once we get a response, send the data.features object to the createFeatures function.
    createFeatures(data.features);
});

//Step 2: Creating Features (Markers)
function createFeatures(earthquakeData) {
    // Define a function that we want to run for each feature in the array.
    // Give each feature a popup that describes the place, time, magnitude, and depth of the earthquake.
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><p><strong>Time:</strong> ${new Date(feature.properties.time)}</p><p><strong>Magnitude:</strong> ${feature.properties.mag}</p><p><strong>Depth:</strong> ${feature.geometry.coordinates[2]} km</p>`);
    }

    // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    // Run the onEachFeature function once for each piece of data in the array.
    let earthquakes = L.geoJSON(earthquakeData, {
        pointToLayer: function (feature, latlng) {
            // Define the color based on depth
            let depth = feature.geometry.coordinates[2];
            let color = "";
            if (depth > 90) { color = "#644d8e"; }
            else if (depth > 70) { color = "#8e5b91"; }
            else if (depth > 50) { color = "#c76b8f"; }
            else if (depth > 30) { color = "#dc828e"; }
            else if (depth > 10) { color = "#ec988e"; }
            else { color = "#ffcc99"; }

            // Define the radius based on magnitude
            let radius = feature.properties.mag * 4;

            return L.circleMarker(latlng, {
                radius: radius,
                fillColor: color,
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 1
            });
        },
        onEachFeature: onEachFeature
    });

    // Send our earthquakes layer to the createMap function.
    createMap(earthquakes);
}
function createMap(earthquakes) {
    // Define streetmap and topomap layers
    let streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    // Define baseMaps object to hold base layers
    let baseMaps = {
        "Street Map": streetMap,
        "Topographic Map": topo
    };

    // Create overlay object to hold overlay layer
    let overlayMaps = {
        Earthquakes: earthquakes
    };

    // Create the map, giving it the streetmap and earthquakes layers to display on load
    let myMap = L.map("map", {
        center: [0,95],
        zoom: 3,
        layers: [streetMap, earthquakes]
    });

    // Create a layer control and pass in baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);

    // Create a legend to display information about the map
    let legend = L.control({ position: 'bottomright' });

    legend.onAdd = function () {
        let div = L.DomUtil.create('div', 'info legend');
        let depths = [0, 10, 30, 50, 70, 90];
        div.innerHTML += "<h3 style='text-align: center'> Depth(km)</h3>"
            colors = ['#ffcc99',"#ec988e","#dc828e","#c76b8f","#8e5b91","#644d8e",]
        
        // Loop through our depth intervals and generate a label with a colored square for each interval
        for (let i = 0; i < depths.length; i++) {
            div.innerHTML += '<i style="background:' + colors[i] + '"></i> ' +
                depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+ ');
        }

        return div;
    };

    // Add legend to the map
    legend.addTo(myMap);
}
