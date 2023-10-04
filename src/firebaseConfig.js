// Import the functions you need from the SDKs you nee
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgl1Kkkaw7_gJny8ISnqxhFean3l_05B8",
  authDomain: "expense-tracker-3bd1f.firebaseapp.com",
  projectId: "expense-tracker-3bd1f",
  storageBucket: "expense-tracker-3bd1f.appspot.com",
  messagingSenderId: "62505281753",
  appId: "1:62505281753:web:7904b01dc7be4e7c5b76c8"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
export const storage=getStorage(app);
export { database };