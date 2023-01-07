// import { Map, Marker, Popup, TileLayer, GeoJSON } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";
import { useEffect, useState, useRef, useContext } from "react";
import GeoErrorModel from "./components/GeoErrorModel";
import MapFeatures from "./components/MapFeatures";
import { ResultMarkerContext } from "./context/ResultMarkerContext";

function App() {
  const [coords, setCoords] = useState(null);
  const [fetchCoords, setFetchCoords] = useState(null);
  const [geoError, setGeoError] = useState(null);
  const [geoErrorMsg, setGeoErrorMsg] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);
  const resultMarker = useContext(ResultMarkerContext);

  const mapRef = useRef();

  const initializeMap = () => {
    mapRef.current = new L.map("map").setView([28.538336, -81.379234], 10);

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
  useEffect(() => {
    //init map
    var container = L.DomUtil.get("map");
    if (container != null) {
      container._leaflet_id = null;
    }
    initializeMap();

    getGeolocations();
  }, []);

  const getGeolocations = () => {
    //check session storage for coords
    if (coords) {
      setCoords(null);
      sessionStorage.removeItem("coords");
      mapRef.current.remove();
      initializeMap();
      // console.log(mapRef.current);

      return;
    }

    if (sessionStorage.getItem("coords")) {
      setCoords(JSON.parse(sessionStorage.getItem("coords")));
      // return;
    }
    setFetchCoords(true);
    navigator.geolocation.getCurrentPosition(setCoordinates, getLocError);
  };

  const setCoordinates = (pos) => {
    //stop fetching
    setFetchCoords(null);

    //set coords in session storage
    const sessionCoords = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
    };

    sessionStorage.setItem("coords", JSON.stringify(sessionCoords));

    //set coords state
    setCoords(sessionCoords);

    plotGeoLocation(sessionCoords);
    return;
  };

  const getLocError = (error) => {
    setFetchCoords(null);
    setGeoError(true);
    setGeoErrorMsg(error.msg);
  };

  const plotGeoLocation = (sessionCoords) => {
    //create sutom marker
    let DefaultMarker = L.icon({
      iconUrl: "/map-marker-red.svg",
      iconSize: [35, 35],
    });

    L.Marker.prototype.options.icon = DefaultMarker;

    // setGeoMarker(
    //   new L.Marker([sessionCoords.lat, sessionCoords.lng]).addTo(map)
    // );

    L.marker([sessionCoords.lat, sessionCoords.lng]).addTo(mapRef.current);

    // L.marker([sessionCoords.lat, sessionCoords.lng]).removeFrom(map);

    //setings map view to current location
    mapRef.current.setView([sessionCoords.lat, sessionCoords.lng], 13);

    closeSearchResults();
  };

  const closeGeoError = () => {
    setGeoError(null);
    setGeoErrorMsg(null);
  };

  const plotResultmarker = ([lng, lat]) => {
    //check to see is resultMarker has value

    if (resultMarker) {
      mapRef.current.remove();
      initializeMap();
    }

    let DefaultMarker = L.icon({
      iconUrl: "/map-marker-blue.svg",
      iconSize: [35, 35],
    });

    L.Marker.prototype.options.icon = DefaultMarker;

    L.marker([lng, lat]).addTo(mapRef.current);
    mapRef.current.setView([lng, lat], 16);
  };

  const toggleSearchResults = () => {
    setSearchResults(!searchResults);
  };

  const closeSearchResults = () => {
    setSearchResults(null);
  };

  const handleSelectedResult = (result) => {
    setSelectedResult(result);

    plotResultmarker([result.center[1], result.center[0]]);
    console.log(selectedResult);
  };

  const removeResult = () => {
    mapRef.current.value();
    initializeMap();
  };

  return (
    <div className="h-screen relative">
      {geoError && (
        <GeoErrorModel
          geoErrorMsg={geoErrorMsg}
          closeGeoError={closeGeoError}
        />
      )}

      <MapFeatures
        coords={coords}
        fetchCoords={fetchCoords}
        getGeoLocations={getGeolocations}
        plotResultmarker={plotResultmarker}
        searchResults={searchResults}
        toggleSearchResults={toggleSearchResults}
        closeSearchResults={closeSearchResults}
        mapRef={mapRef}
        initializeMap={initializeMap}
        selectedResult={selectedResult}
        handleSelectedResult={handleSelectedResult}
        removeResult={removeResult}
      />

      <div id="map" ref={mapRef} className="h-full z-[1]"></div>
    </div>
  );
}

export default App;
