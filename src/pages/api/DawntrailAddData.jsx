import { useSearchParams } from "react-router-dom";
import database from "../../firebase/firebase-firestore";

// ehh good enough
const DawntrailAddData = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  let data = {
    mapname: searchParams.get("map"),
    mobid: searchParams.get("mobid"),
    name: searchParams.get("name"),
    position: {
      x: searchParams.get("x"),
      y: searchParams.get("y"),
      z: searchParams.get("z"), // z is unused, but still
    },
    mapid: searchParams.get("mapid"),
    rank: searchParams.get("rank"),
    currTime: new Date(Date.now()).toUTCString(),
    playerid: searchParams.get("userid"),
  };

  //127.0.0.1:5173/#/api/hunts/dawntrail?mobid=123&name=hello&x=1&y=2&z=3&mapid=456&rank=B&userid=fff45&map=limsa

  //127.0.0.1:5173/#/api/hunts/dawntrail?mobid=123&name=hello&z=3&mapid=148&rank=A&userid=TEST&map=Central Shroud&x=28.75&y=14.45

  const db = database();
  db.addDawntrailHunt(data);

  return (
    <div className="Dawntrail-div">
      <h1>TESTY MC TEST</h1>
      <p>HELLO THIS IS A TEST</p>
    </div>
  );
};

export default DawntrailAddData;
