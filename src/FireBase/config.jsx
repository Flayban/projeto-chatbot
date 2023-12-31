// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//Config do FireBase
const firebaseConfig = {
  apiKey: "AIzaSyAeNHhucmcNXBdTxRgPLZjbdheT1B_ho08",
  authDomain: "projeto-chatbot-3d810.firebaseapp.com",
  projectId: "projeto-chatbot-3d810",
  storageBucket: "projeto-chatbot-3d810.appspot.com",
  messagingSenderId: "220537372489",
  appId: "1:220537372489:web:f13737b50c85e8ad8da498",
  measurementId: "G-8X8ZEDTVE6"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db};