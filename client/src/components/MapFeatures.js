import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { ResultMarkerContext } from "../context/ResultMarkerContext";

const MapFeatures = ({
  coords,
  fetchCoords,
  getGeoLocations,
  plotResultmarker,
  searchResults,
  toggleSearchResults,
  closeSearchResults,
  mapRef,
  initializeMap,
  selectedResult,
  handleSelectedResult,
  removeResult,
}) => {
  const [searchQuery, setSearchQuery] = useState(null);
  const [searchData, setSearchData] = useState([]);
  const [queryTimeout, setQueryTimeout] = useState(null);
  const { setResultMarker } = useContext(ResultMarkerContext);

  const handleInput = (e) => {
    setSearchQuery(e.target.value);

    search();
  };

  const search = () => {
    clearTimeout(queryTimeout);

    setSearchData(null);
    setQueryTimeout(
      setTimeout(async () => {
        if (searchQuery !== "") {
          const params = new URLSearchParams({
            access_token:
              "pk.eyJ1IjoibWlzaXhpIiwiYSI6ImNsY2Q4bnVtaTA5eWIzbmx3YngzYzJ0ZDMifQ.ZTJICPqdi9HfKAIn1BbABg",
            fuzzyMatch: true,
            language: "en",
            limit: 7,
            proximity: coords ? `${coords.lng},${coords.lat}` : "0,0",
          });
          const getData = await axios.get(
            `http://localhost:4000/api/search/${searchQuery}?${params}`
          );

          setSearchData(getData.data.features);
        }
      }, 750)
    );
  };

  return (
    <div className="w-full md:w-auto absolute md:top-[40px] md:left-[60px] z-[2] flex gap-4 px-6 py-8 md:px-0 md:py-0 bg-black/10 backdrop-blur-lg">
      {/* Search */}
      <div className="relative flex-1 md:min-w-[350px]">
        {/* Input */}
        <input
          className="pl-9 pr-4 py-3 text-sm focus:outline-none w-full drop-shadow-2xl rounded-md"
          type="text"
          name=""
          id=""
          placeholder="Start your search"
          onChange={handleInput}
          onFocus={toggleSearchResults}
        />
        {/* Search Icon */}
        <div className="absolute top-0 left-[8px] h-full flex items-center">
          <i className="fa-solid fa-magnifying-glass-location"></i>
        </div>
        {/* close icon */}
        {searchQuery && (
          <button
            className="absolute top-0 right-[12px] h-full flex items-center"
            onClick={() => {
              setSearchQuery("");
            }}
          >
            <i className="fa-solid fa-x"></i>
          </button>
        )}
        {/* Search results */}
        {searchQuery && searchResults && (
          <div className="absolute mt-2 w-full bg-white/70 backdrop-blur-lg">
            <div className="h-[200px] drop-shadow-2xl overflow-auto overflow-x-hidden scroll-behavior: smooth bg-white/70 rounded-md shadow-md scrollbar-thin scrollbar-track-slate-400 scrollbar-thumb-slate-700 scrollbar-thumb-rounded-full scrollbar-track-rounded-full ">
              {/* Results */}
              {searchData?.map((result) => {
                return (
                  <div
                    key={result.id}
                    className="px-4 py-2 flex gap-x-2 cursor-pointer hover:bg-slate-600 backdrop-blur-lg hover:text-white"
                    onClick={() => {
                      handleSelectedResult(result);
                    }}
                  >
                    <i className="fa-solid fa-map-pin"></i>
                    <p className="text-xs">{result.place_name_en}</p>
                  </div>
                );
              })}
            </div>
            {/* Select Search result */}
            {selectedResult && (
              <div className="mt-2 px-4 py bg-white rounded-md">
                <i
                  className="fa-regular fa-circle-xmark flex justify-end "
                  onClick={removeResult}
                ></i>
                <h1 className="text-lg">{selectedResult.text}</h1>
                <p className="text-xs mb-1">
                  {selectedResult.properties.address}, {selectedResult.city},
                  {selectedResult.state}
                </p>
                <p className="text-xs">{selectedResult.properties.category}</p>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Geo location */}
      <div
        className={`px-4  flex items-center shadow-md rounded-md min-h-[45px] ${
          coords ? "bg-slate-700/75" : "bg-white/70"
        } backdrop-blur-lg`}
        onClick={getGeoLocations}
      >
        <i
          className={`fa-solid fa-location-arrow text-[18px] 
          ${coords ? "text-white" : "text-slate-600"} ${
            fetchCoords ? "animate-pulse" : ""
          } `}
        ></i>
      </div>
    </div>
  );
};

export default MapFeatures;
