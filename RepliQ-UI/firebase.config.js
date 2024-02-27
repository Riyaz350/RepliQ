import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBu5HNk7tKviIFdik5kaw21AZbIyfiKq3k",
  authDomain: "repliq-f3b92.firebaseapp.com",
  projectId: "repliq-f3b92",
  storageBucket: "repliq-f3b92.appspot.com",
  messagingSenderId: "790280823447",
  appId: "1:790280823447:web:a4cae52085a52a863a3fd2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;