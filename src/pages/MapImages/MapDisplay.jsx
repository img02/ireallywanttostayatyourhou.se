import Credit from "../../assets/images/credit.png";

import database from "../../firebase/firebase-firestore";
import { useEffect, useState } from "react";

const MapDisplay = (map) => {
  //TODO replace height width
  const sizeModifier = 0.6;
  const imgsize = document.documentElement.clientWidth * sizeModifier;
  const conversionRatePx = 2048 / 41;

  const [getData, setData] = useState([]);
  const fetchData = async () => {
    const db = database();
    setData(await db.getMapData(map));
    //console.log(getData);
  };

  useEffect(() => {
    console.log(getData);
    drawCircles();
  }, [getData]);

  //todo idk take in array of positions and draw cirles in a loop
  // maybe have another fn first that gets averages of pos in a 0.5-1 coord radius
  const drawCircles = () => {
    const canvas = document.getElementById("map-canvas");
    const context = canvas.getContext("2d");

    //console.log("start draw circle");

    getData.forEach((point) => {
      const x = point.position.x - 1;
      const y = point.position.y - 1;

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
    await fetchData();
  };

  // let x = useRef(0);
  // let y = useRef(0);
  const [useX, setX] = useState(0);
  const [useY, setY] = useState(0);

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
  return (
    <div id="map-image-div">
      <div id="map-top-bar">
        displaying selected map image: {map.name}
        <button onClick={test}>test</button>
        <button id="save-map-image-button" onClick={saveImage}>
          save
        </button>
      </div>
      <div id="map-coordinates">{`(${useX}, ${useY})`}</div>

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
