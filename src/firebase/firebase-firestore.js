import { initializeApp } from "firebase/app";
import "firebase/firestore";
import getFirebaseConfig from "./firebase-config";
import {
  addDoc,
  collection,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { getDoc, doc, setDoc } from "firebase/firestore";

// Initialize Firebase
const database = () => {
  const firebaseConfig = getFirebaseConfig();
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  let data = {
    mobid: 1111111,
    name: "lololololol",
    position: { x: 1, y: 2, z: 3 },
    mapid: 0,
    rank: "b",
    currTime: new Date(Date.now()).toUTCString(),
    playerid: "lovelovelovelove",
  };

  //todo, yeah this works
  // creates new collection is required, adds new doc with auto generated id.
  // go with map_name / mapid? -> autoid -> data
  const addTestData = async () => {
    const mapDoc = await collection(db, "map_name");
    await addDoc(mapDoc, data);
  };

  const addDawntrailHunt = async (data) => {
    if (!validateData(data)) {
      console.log("failed to add hunt");
      return false;
    }

    const mapDoc = await collection(db, "map_name");
    await addDoc(mapDoc, data);
  };

  //todo : better validation
  const validateData = (data) => {
    if (data.mobid === null) return false;
    if (data.mobid.toString().length > 4) return false;

    if (data.name === null) return false;
    if (data.name.length > 20) return false;

    if (data.position === null) return false;
    if (data.position.x.toString().length > 4 === null) return false;
    if (data.position.y.toString().length > 4 === null) return false;
    if (data.position.z.toString().length > 4 === null) return false;

    if (data.mapid === null) return false;
    if (data.mapid.toString().length > 4) return false;

    if (data.rank === null) return false;
    if (data.rank.length > 2) return false;

    if (data.currTime === null) return false;
    if (data.currTime.length > 30) return false;

    if (data.playerid === null) return false;
    if (data.playerid.length > 30) return false;
    return true;
  };

  return {
    addTestData,
    addDawntrailHunt,
  };
};

export default database;
