import Credit from "../../assets/images/credit.png";

import database from "../../firebase/firebase-firestore";
import { useEffect, useState } from "react";

const MapDisplay = (map) => {
  //TODO replace height width
  const sizeModifier = 0.6;
  const imgsize = document.documentElement.clientWidth * sizeModifier;
  const conversionRatePx = 2048 / 41;

  const [combine, setCombine] = useState(true);

  const [getData, setData] = useState([]);
  const [getAvg, setAvg] = useState([]);

  const fetchData = async () => {
    console.log("fetching");
    const db = database();
    setData(
      (await db.getMapData(map)).sort((a, b) => a.position.x - b.position.x)
    );
  };

  useEffect(() => {
    if (map === null || map === undefined) return;
    //console.log(getData);
    drawCircles(combine);
    drawDataPointsCountText();
  }, [getData]);

  const drawDataPointsCountText = () => {
    const canvas = document.getElementById("map-canvas");
    const context = canvas.getContext("2d");
    context.fillStyle = `rgba(45, 42, 136, 0.85)`;
    context.font = "bold 18px roboto mono";
    context.fillText(`${getData.length} data points`, 140, 1994);
  };

  const processSpawnPoints = () => {
    // without 'cloning' array, modifying getData directly will not cause rerender and could cause stale data to be displayed in the future? depending on if it's used elsewhere
    let data = getData.slice();
    let remaining = [];

    //go thru x
    let avg = [];
    let comparer = data[0];
    let cluster = [data[0]];

    let j = 0;
    while (data.length > 0) {
      if (data.length == 1) {
        cluster.push(data[0]);
      }

      j++;
      //console.log(j);
      if (j > 70) break;

      for (let i = 1; i < data.length; i++) {
        if (j > 70) break;

        if (Math.abs(data[i].position.x - comparer.position.x) <= 0.5) {
          if (Math.abs(data[i].position.y - comparer.position.y) <= 0.5) {
            cluster.push(data[i]);
          } else {
            remaining.push(data[i]);
          }
        } else {
          remaining.push(...data.slice(i));
          break;
        }
        /*
        //if within 1 coordinate        
        if (Math.abs(data[i].position.x - base.position.x) < 1) {
          if (Math.abs(data[i].position.y - base.position.y) < 1) {
            toAvg.push(data[i]);
            if (i == data.length - 1) {
              data = [];
            }
          } else {
            remaining.push(data[i]);
          }
        } else {
          //rebase
          avg.push(calcAverage(toAvg));
          toAvg = [];

          remaining.push(...data.slice(i));
          data = remaining.slice();
          remaining = [];
          if (data.length > 0) base = data[0];

          break; //and restart forloop with new remaining.
        }
        if (data == []) {
          avg.push(calcAverage(toAvg));
          toAvg = [];

          remaining.push(...data.slice(i));
          data = remaining.slice();
          remaining = [];
          if (data.length > 0) base = data[0];
        }
          */
      }

      avg.push(calcAverage(cluster));
      data = remaining.slice();
      if (data.length > 0) {
        cluster = [data[0]];
        comparer = data[0];
      }
      remaining = [];
    }

    setAvg(avg);

    // console.log(averagedCoords);
    return avg;
  };

  const calcAverage = (cluster) => {
    //console.log(cluster.length);
    let x = 0;
    let y = 0;
    let count = 0;

    cluster.forEach((c) => {
      x += parseFloat(c.position.x);
      y += parseFloat(c.position.y);
      count++;
    });
    //console.log(`${x / count}, ${y / count}`);
    return { position: { x: x / count, y: y / count } };
  };

  //draWs the spawn points from db
  const drawCircles = (combine) => {
    const canvas = document.getElementById("map-canvas");
    const context = canvas.getContext("2d");

    let coords = getData.slice();

    if (combine) coords = processSpawnPoints();

    coords.forEach((point) => {
      const x = point.position.x - 1;
      const y = point.position.y - 1;

      // SS rank ids, irrelevant to A,B,S spawn points
      if (point.mobId == 13406 || point.mobId == 13407) {
        return;
      }

      //console.log(`hello : ${x}, ${y}`);

      context.strokeStyle = `rgba(0, 0, 0, 0.85)`;
      context.fillStyle = `rgba(45, 42, 136, 0.85)`; // blue

      context.beginPath();
      context.arc(
        x * conversionRatePx,
        y * conversionRatePx,
        12.5,
        0,
        2 * Math.PI
      );

      context.stroke();
      context.fill();
    });
  };

  const drawCanvas = async () => {
    const canvas = document.getElementById("map-canvas");
    const context = canvas.getContext("2d");
    context.drawImage(document.getElementById("map-image"), 0, 0);
    context.drawImage(document.getElementById("map-image-credit"), 50, 1900);
    context.fillStyle = `rgba(45, 42, 136, 0.85)`; // blue
    context.font = "bold 50px roboto mono";
    context.fillText(`${map.name.split("_").join(" ")}`, 1550, 80);
    await fetchData();
  };

  // let x = useRef(0);
  // let y = useRef(0);
  const [getX, setX] = useState(0);
  const [getY, setY] = useState(0);

  const setCoords = (e) => {
    const canvas = document.getElementById("map-canvas");
    const rect = canvas.getBoundingClientRect();
    setX(
      Math.round(
        ((e.nativeEvent.clientX - rect.left) / 24.9 + 1 + Number.EPSILON) * 100
      ) / 100
    ); //canvas scale 0.5
    setY(
      Math.round(
        ((e.nativeEvent.clientY - rect.top) / 24.9 + 1 + Number.EPSILON) * 100
      ) / 100
    ); //canvas scale 0.5

    const coordsDiv = document.getElementById("map-coordinates");
    coordsDiv.style.position = "absolute";
    coordsDiv.style.top = `${e.nativeEvent.clientY - 40}px`;
    coordsDiv.style.left = `${e.nativeEvent.clientX - 50}px`;
  };

  //todo maybe make a button that can save all images?
  // in prev component, would require processing all data earlier.
  const saveImage = () => {
    const canvas = document.getElementById("map-canvas");
    //opens in new tab
    //window.open(canvas.toDataURL("image/jpg"));

    var pic = canvas.toDataURL("jpg");
    var a = document.createElement("a");
    a.href = pic;
    a.download = `${map.name}-data.jpg`;
    a.click();
  };

  const test = () => {
    console.log(getData);
  };

  const copyAvgAsJson = () => {
    const averagedCoords = getAvg;
    let json = `{"MapName": "${map.name.split("_").join(" ")}",
    "MapID": ${map.id},
    "Positions": [`;
    for (let i = 0; i < averagedCoords.length; i++) {
      const c = averagedCoords[i];
      json =
        json +
        `{"X": ${c.position.x.toFixed(2)}, "Y": ${c.position.y.toFixed(
          2
        )}, "Taken": false}`;
      if (i < averagedCoords.length - 1) json = json + ",";
    }
    json = `${json}], "Recording": false},`;
    navigator.clipboard.writeText(json);
  };

  if (map === null || map === undefined) return;
  else
    return (
      <div id="map-image-div">
        <div id="map-top-bar">
          displaying selected map image: {map.name}
          <button onClick={copyAvgAsJson}>to hh json</button>
          <button
            onClick={() => {
              setCombine(!combine);
              drawCanvas();
            }}
          >
            toggle clusters
          </button>
          <button onClick={test}>toconsole</button>
          <button id="save-map-image-button" onClick={saveImage}>
            save
          </button>
        </div>
        <div id="map-coordinates">{`(${getX.toFixed(2)}, ${getY.toFixed(
          2
        )})`}</div>

        <canvas
          id="map-canvas"
          height={2048}
          width={2048}
          onMouseMove={setCoords}
        ></canvas>
        <img
          id="map-image"
          src={map.src}
          onLoad={async () => await drawCanvas()}
          draggable="false"
        ></img>
        <img id="map-image-credit" src={Credit} draggable="false"></img>
      </div>
    );
};

export default MapDisplay;
