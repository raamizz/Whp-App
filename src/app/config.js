import exp from "constants";
import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth } from "firebase/auth";

const firebaseConfig = 
{
  apiKey: "AIzaSyBgFoDFSsGYKCs1_GMN2-IsS876mjIP7tM",
  authDomain: "whp-12afa.firebaseapp.com",
  projectId: "whp-12afa",
  storageBucket: "whp-12afa.appspot.com",
  messagingSenderId: "125619387302",
  appId: "1:125619387302:web:3065999a9dace51e2d6d67",
  measurementId: "G-KS3DVFD5ZW",
};

const app = initializeApp(firebaseConfig);
export { app };

export const auth = getAuth(app);

export const slogans = [
  "WELCOME TO WHP JEWELLERS",
  "WE OFFER SAFE AND SECURE SHIPPING",
  "USE OFFER5000 & GET 5000 ON MINI PURCHASE OF 1LAC"
]