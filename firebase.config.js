// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyAPYYybhetRMsw44Pb43H8NN0MZ4OmBg40",
    authDomain: "evenza-a317b.firebaseapp.com",
    projectId: "evenza-a317b",
    storageBucket: "evenza-a317b.appspot.com",
    messagingSenderId: "626105620906",
    appId: "1:626105620906:web:9bd4c9e0e333cbe32873d3",
    measurementId: "G-WJ73HXXHLZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
