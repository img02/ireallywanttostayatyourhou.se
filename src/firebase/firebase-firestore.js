import { initializeApp } from "firebase/app";
import "firebase/firestore";
import getFirebaseConfig from "./firebase-config";
import {
  addDoc,
  collection,
  getDocs,
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

    // get mapname in english from hh
    // or just use map id instead?
    // undecided
    let postData = {
      mobId: data.mobid,
      name: data.name,
      position: data.position,
      mapId: data.mapid, // maybe use this as collection name
      time: data.currTime,
      playerId: data.playerid,
    };
    const mapDoc = await collection(db, data.mapname);
    await addDoc(mapDoc, postData);
  };

  //todo : better validation
  const validateData = (data) => {
    if (data === null || data === undefined) return false;

    if (data.mapname == null) return false;
    if (data.mapname.length > 30) return false;

    if (data.mobid == null) return false;
    if (data.mobid.toString().length > 4) return false;

    if (data.name == null) return false;
    if (data.name.length > 20) return false;

    if (data.position == null) return false;
    if (data.position.x == null) return false;
    if (data.position.y == null) return false;
    if (data.position.z == null) return false;

    if (data.position.x.toString().length > 4) return false;
    if (data.position.y.toString().length > 4) return false;
    if (data.position.z.toString().length > 4) return false;

    if (data.mapid == null) return false;
    if (data.mapid.toString().length > 4) return false;

    if (data.rank == null) return false;
    if (data.rank.length > 2) return false;

    if (data.currTime == null) return false;
    if (data.currTime.length > 30) return false;

    if (data.playerid == null) return false;
    if (data.playerid.length > 80) return false;

    return true;
  };

  /***
   *  Returns map spawn position data, excluding SS ranks (SS and SS minions)
   *
   *
   *
   */
  const getMapData = async (data) => {
    if (data == null) return null;
    if (data.name == null) return null;

    let name = data.name.split("_").join(" ");
    if (name === "The Raktika Greatwood") name = "The Rak'tika Greatwood"; //weird name

    const id = data.id;

    //todo remove
    //console.log(name);
    // console.log(id);

    // https://firebase.google.com/docs/firestore/query-data/get-data#get_all_documents_in_a_collection

    const querySnapshot = await getDocs(collection(db, name));
    const results = querySnapshot.docs
      .filter((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const id = doc.data().mobId;
        if (id == 8916 || id == 8915 || id == 10615 || id == 10616)
          // ss mob forgiven, ker
          return false;
        return true;
      })
      .map((doc) => {
        //console.log(doc.id, " => ", doc.data());
        return doc.data();
      });

    //todo debug delete later idk
    // results.forEach((doc) => {
    //   console.log(doc);
    // });

    return results;
  };

  return {
    addTestData,
    addDawntrailHunt,
    getMapData,
  };
};

export default database;
