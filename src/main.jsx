import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import DawntrailAddData from "./pages/api/DawntrailAddData.jsx";
import GetMapData from "./pages/api/GetMapData.jsx";
import DawntrailMaps from "./pages/MapImages/DawntrailMaps.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route
          path="/api/hunts/dawntrail"
          element={<DawntrailAddData />}
        ></Route>
        <Route path="/api/map" element={<GetMapData />}></Route>
        <Route path="/dawntrail" element={<DawntrailMaps />}></Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
