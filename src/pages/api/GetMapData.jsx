import { useSearchParams } from "react-router-dom";
import database from "../../firebase/firebase-firestore";
import { useEffect, useState } from "react";

const GetMapData = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  let map = {
    name: searchParams.get("name"),
    id: searchParams.get("id"),
  };

  const [getData, setData] = useState([]);

  const fetchData = async () => {
    const db = database();
    setData(await db.getMapData(map));
    console.log(getData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  ///http://127.0.0.1:5173/#/api/map?name=Central%20Shroud&id=148

  return (
    <div className="Dawntrail-div">
      <h1>idk put coords in plaintext or something, formatted?</h1>
      <p>HELLO HOW ARE YOU?</p>
      <div id="map-get-data">
        {getData.map((d) => {
          return (
            <div
              key={`${d.playerId} + ${d.time}`}
            >{`mob id: ${d.mobId} found @ (${d.position.x}, ${d.position.y})`}</div>
          );
        })}
      </div>
    </div>
  );
};

export default GetMapData;
// this page isn't really needed, just cbf removing in case
