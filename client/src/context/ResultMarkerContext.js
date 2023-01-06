import { createContext, useState } from "react";

export const ResultMarkerContext = createContext();

export const ResultMarkerContextProvider = (props) => {
  const [resultMarker, setResultMarker] = useState(null);

  return (
    <ResultMarkerContext.Provider value={{ resultMarker, setResultMarker }}>
      {props.children}
    </ResultMarkerContext.Provider>
  );
};
