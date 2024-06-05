import { useSearchParams } from "react-router-dom";
import database from "./firebase/firebase-firestore";

const Dawntrail = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  let data = {
    mobid: searchParams.get("mobid"),
    name: searchParams.get("name"),
    position: { 'x': searchParams.get("x"), 'y': searchParams.get("y") , 'z': searchParams.get("z") },
    mapid: searchParams.get("mapid"),
    rank: searchParams.get("rank"),
    currTime: new Date(Date.now()).toUTCString(),
    playerid: searchParams.get("userid"),
  };
  //127.0.0.1:5173/#/api/hunts/dawntrail?mobid=123&name=hello&x=1&y=2&z=3&mapid=456&rank=B&userid=fff45

   const db = database();
   db.addDawntrailHunt(data);

return (     
  <div className="Dawntrail-div">
    <h1>TESTY MC TEST</h1>
    <p>HELLO THIS IS A TEST</p>
    </div>
  );
};

export default Dawntrail

