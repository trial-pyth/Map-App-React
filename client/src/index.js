import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ResultMarkerContextProvider } from "./context/ResultMarkerContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ResultMarkerContextProvider>
    <App />
  </ResultMarkerContextProvider>
);
