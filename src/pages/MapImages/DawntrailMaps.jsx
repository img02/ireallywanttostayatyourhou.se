import "../../assets/DawntrailMap.css";

import database from "../../firebase/firebase-firestore";
import MapDisplay from "./MapDisplay";
import maps from "../../MapData";

import { useSearchParams, Link } from "react-router-dom";
import { useState } from "react";

const Dawntrail = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currMap = searchParams.get("map");

  //TODO
  //uhh idk, have a premade list of map names,
  // send that thru to a component
  // in that component, render appropriate image
  // get relevant data from db
  // process average spawn points
  //     - create arrays for each group of spawn points
  //          that are within 1-2 coordinates of eachother?
  //          then average out a middle spot
  //          overlay / draw a blueish tinged circle

  const displayMap = () => {
    if (currMap === null) return;

    //console.log("hi");
    const img = maps.find((m) => m.name == currMap);
    return MapDisplay(img);
  };

  return (
    <div className="Dawntrail-div">
      {maps.map((mapname) => {
        return (
          //TODO direct to dawntrail/mapname? or use name as url param? and put this list in a if param == null, draw?
          <li key={mapname.name}>
            <Link to={`/dawntrail?map=${mapname.name}`}>{mapname.name}</Link>
          </li>
        );
      })}
      {displayMap()}
    </div>
  );
};

export default Dawntrail;
