import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBt3p-PcHhtEam_ES-4sdli1mzIrQ-f404",
  authDomain: "appli-placement.firebaseapp.com",
  projectId: "appli-placement",
  storageBucket: "appli-placement.firebasestorage.app",
  messagingSenderId: "44777597875",
  appId: "1:44777597875:web:35533f34b8845587f2f9c6",
  measurementId: "G-E03LGV9XL6"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);