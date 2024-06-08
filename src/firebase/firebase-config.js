// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAe8tG4kMOO0atjogbT8Q29Ynl2peIZqCc",
  authDomain: "hunthelper-dawntrail.firebaseapp.com",
  projectId: "hunthelper-dawntrail",
  storageBucket: "hunthelper-dawntrail.appspot.com",
  messagingSenderId: "702083067653",
  appId: "1:702083067653:web:e02fffc8fcd3ebc0fa516c",
};

const getFirebaseConfig = () => {
  return firebaseConfig;
};

export default getFirebaseConfig;
