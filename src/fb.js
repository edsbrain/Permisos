// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQdM4VAApy4goBolNr7N2kuxieYejxCrM",
  authDomain: "marybel-project.firebaseapp.com",
  projectId: "marybel-project",
  storageBucket: "marybel-project.appspot.com",
  messagingSenderId: "75946948020",
  appId: "1:75946948020:web:d5bda5f035627824f62ee1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db =getFirestore(app)

export default db