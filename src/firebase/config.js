import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB6_RRa-pAYwqfwtba_U1Z4zWggvLEbSQU",
  authDomain: "blog-18e97.firebaseapp.com",
  projectId: "blog-18e97",
  storageBucket: "blog-18e97.appspot.com",
  messagingSenderId: "691885970526",
  appId: "1:691885970526:web:d6c862dac0cb9594e0d0cf"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}