import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3AGuJeJ5wdvU7a1F5UIyuLZci5lmRxnA",
  authDomain: "evaluation-app-e5eb3.firebaseapp.com",
  databaseURL: "https://evaluation-app-e5eb3-default-rtdb.firebaseio.com",
  projectId: "evaluation-app-e5eb3",
  storageBucket: "evaluation-app-e5eb3.appspot.com",
  messagingSenderId: "593002955709",
  appId: "1:593002955709:web:16bf56dff562d54e3908d4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
