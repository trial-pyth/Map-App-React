import React from "react";

const GeoErrorModel = ({ geoErrorMsg, closeGeoError }) => {
  return (
    <div className="error-modal">
      <div className=" h-screen absolute w-full z-50 flex justify-center items-start pt-[125px] bg-black/50 backdrop-blur-sm opacity-99 transition ease-in-out delay-150 duration-1500 ">
        <div className="flex flex-col bg-black/40 w-[80%] sm:w-[450px] px-6 py-4 rounded-md backdrop-blur-md">
          <h1 className="text-lg text-white mb-1">Error: {geoErrorMsg}</h1>
          <p className="text-sm text-white mb-4">
            To take advantage of this applications features, please ensure
            location services are enabled
          </p>
          <button
            className="self-start py-2 px-4 bg-red-500/60 backdrop-blur-md text-white rounded-md text-sm"
            onClick={closeGeoError}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeoErrorModel;
