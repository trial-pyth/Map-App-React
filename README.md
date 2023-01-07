# 🗺️ __Travel App React__
A React App that tracks users location , can search places using Mapbox API and can add new markers

## A simple map application using React as frontend , Mapbox forward API for search coordinates and LeafletJS <img src="https://github.com/trial-pyth/Travel-App-React/blob/master/img/leaflet.png?raw=true" alt="leaflet-logo" width=120 height=40/> for map tiles

### ⚠️ __Note__

#### Use mapRef to Initialize your Map. Ignore the functions present in leaflet documentation. Some methods like `addLayer` is not working 
in React v18.

```JS
const mapRef = useRef();

  const initializeMap = () => {
    mapRef.current = new L.map("map").setView([0, 0], 13);

    L.tileLayer(
      `https://api.mapbox.com/styles/v1/misixi/clcedh8kx000b14mr7776gtot/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_API_KEY}`,
      {
        attribution:
          "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      }
    ).addTo(mapRef.current);

    mapRef.current.on("moveend", () => {
      closeSearchResults();
    });
  };
  
  ```

#### Initialize your map everytime using useEffect(). The below method is important else, your app will crash after refresh

```JS
useEffect(() => {
    //init map
    var container = L.DomUtil.get("map");
    if (container != null) {
      container._leaflet_id = null;
    }
    initializeMap();

    getGeolocations();
  }, []);
```
## __📍 Use mouse to zoom and move the map layer__

<img src="https://github.com/trial-pyth/Travel-App-React/blob/master/img/movement-zoom.gif?raw=true" alt="movement-zoom" width=600 height=500/>

## __Enable location access and toggle location mode__

<img src="https://github.com/trial-pyth/Travel-App-React/blob/master/img/location-mode.gif?raw=true" alt="location-mode" width=500 />

## 🔍 __Search for your desired location in the search bar__

<img src="https://github.com/trial-pyth/Travel-App-React/blob/master/img/search.gif?raw=true" alt="movement-zoom" width=600 height=300 />

## 🗾 Make sure that you have given access to your location in the browser and in your settings

<img src="https://github.com/trial-pyth/Travel-App-React/blob/master/img/location-error.gif?raw=true" alt="movement-zoom" width=600 height=300 />
