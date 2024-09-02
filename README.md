# $${\color{green}Leaflet \space \color{lightblue}challenge}$$
<img width="190" alt="leaflet-logo" src="https://github.com/user-attachments/assets/fa558979-27fb-4087-bfdd-4993f05ff319">

#### **$${\color{green}Project \space \color{lightblue}Background}$$**
The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. The USGS is interested in building a new set of tools that will allow them to visualise their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualise USGS data that will allow them to better educate the public and other government organisations (and hopefully secure more funding) on issues facing our planet.

**Project Summary:**

Created a web map using Leaflet, D3.js, and data from the USGS (United States Geological Survey) to visualize recent earthquakes on a world map. The map includes two base layers ("Street Map" and "Topographic Map"), an overlay showing the tectonic plates, and another overlay displaying earthquake data. Earthquakes are represented as circle markers, with their size determined by the magnitude and color by the depth of the earthquake. A legend is added to the map to explain the color coding used for the depth categories.

The instructions for this activity are broken into two parts:
- Part 1: Create the Earthquake Visualisation
- Part 2: Gather and Plot More Data (Optional with no extra points earning)

#### Part 1: Create the Earthquake Visualisation
<img width="500" alt="2-BasicMap" src="https://github.com/user-attachments/assets/b2a73ac3-f6b2-49dd-b788-0d9836975fa9">

Your first task is to visualise an earthquake dataset. Complete the following steps:

- Get your dataset. To do so, follow these steps:
    - The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit [The USGS GeoJSON Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page and choose a dataset to visualise. The following image is an example screenshot of what appears when you visit this link:

<img width="400" alt="3-Data" src="https://github.com/user-attachments/assets/9b4af735-0207-4358-bf53-1fb08c4fd291">

  -When you click a dataset (such as "All Earthquakes from the Past 7 Days"), you will be given a JSON representation of that data. Use the URL of this JSON to pull in the data for the visualisation. The following image is a sampling of earthquake data in JSON format:

<img width="500" alt="4-JSON" src="https://github.com/user-attachments/assets/8fdca73b-d5e7-4b92-bb7d-7e71050cff01">

2. Import and visualise the data by doing the following:
    - Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.
        - Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by colour. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in colour.
        - Hint: The depth of the earth can be found as the third coordinate for each earthquake.
    - Include popups that provide additional information about the earthquake when its associated marker is clicked.
    - Create a legend that will provide context for your map data.
    - Your visualisation should look something like the preceding map.

#### Part 2: Gather and Plot More Data 
Plot a second dataset on your map to illustrate the relationship between tectonic plates and seismic activity. You will need to pull in this dataset and visualise it alongside your original data. Data on tectonic plates can be found at (https://github.com/fraxen/tectonicplates)
The following image is an example screenshot of what you should produce:

<img width="500" alt="5-Advanced" src="https://github.com/user-attachments/assets/d777973d-95d2-426f-9e14-9e0c95547024">

Perform the following tasks:
  - Plot the tectonic plates dataset on the map in addition to the earthquakes.
  - Add other base maps to choose from.
  - Put each dataset into separate overlays that can be turned on and off independently.
  - Add layer controls to your map.

#### Step-By-Step Process to achieve desired outcome.

**Step 1 :Fetching Earthquake Data:**

- The script starts by fetching recent earthquake data in GeoJSON format from the USGS API.
- d3.json(url): This uses D3.js to fetch the JSON data from the provided URL. The URL points to a GeoJSON feed of earthquake data.
- then(function (data) { ... }): This function is called after the data is successfully fetched. The data object contains the entire GeoJSON structure.
- data.features: This accesses the features array inside the GeoJSON object. Each element in this array represents an earthquake event, with its properties (magnitude, place, etc.) and geometry (coordinates).
- The data is passed to a function createFeatures for further processing.

**Step 2 : Creating Features (Markers) for the Earthquakes:**
- Each earthquake in the dataset is represented as a circle marker on the map.
- createFeatures(earthquakeData): This function processes the array of earthquake features.
- onEachFeature(feature, layer): This function is called for each earthquake feature. It attaches a popup to the marker that shows the earthquake's place, time (converted to a human-readable format using new Date()), magnitude, and depth.
- L.geoJSON(earthquakeData, {...}): Creates a Leaflet GeoJSON layer. This layer automatically parses the geometry of each feature to create markers on the map.
- pointToLayer: function (feature, latlng): This customizes how each GeoJSON point is rendered on the map. Instead of the default marker, we use a circle marker (L.circleMarker) whose size depends on the earthquake's magnitude and color depends on depth.
- radius: The radius of the circle marker is set based on the earthquake's magnitude (feature.properties.mag).
- fillColor: The color of the marker depends on the earthquake's depth, with deeper earthquakes having a darker color.

**Step 3 :Creating the Map**
- Tile Layers (streetMap and topo): These are two different map styles that can be used as the background of the map. The streetMap uses OpenStreetMap tiles, and the topo uses OpenTopoMap tiles.
- The earthquake markers are added as an overlay to the map.
- Tectonic plate boundaries are added as another overlay, visualized as yellow lines with no fill.
- baseMaps and overlayMaps: These objects hold the base layers (map styles) and the overlay layers (earthquake markers , Tectonic plates) that can be toggled on the map.
- L.map("map", {...}): Creates the Leaflet map with an initial zoom level of 5. The map starts with the streetMap and earthquakes layers visible.
- L.control.layers(...): Adds a control to the map that allows the user to toggle between different base maps and overlay layers.

- Adding a Legend:
    - A legend is created and positioned in the bottom right corner of the map.
    - The legend explains the color coding of the earthquake markers based on depth.
    - The legend dynamically generates color squares corresponding to the depth ranges and displays them next to the depth intervals.
![image](https://github.com/user-attachments/assets/41a07c9d-89af-448e-a68c-3e633f191b85)
- Final Map Setup:
    - The map is displayed with the chosen layers, overlays, and legend.
    - The user can toggle between different base maps and overlays using the layer control.

##### References
Dataset created by [the United States Geological Survey](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)
[Leaflet Documentation](https://leafletjs.com/reference.html)
chat GPT
