// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD1gpfrn79lHm7XINhsP-9_iE-8zyUbmdE",
    authDomain: "job-tracker-9c154.firebaseapp.com",
    projectId: "job-tracker-9c154",
    storageBucket: "job-tracker-9c154.appspot.com",
    messagingSenderId: "167686791246",
    appId: "1:167686791246:web:904e11b8eb2cefbb9b631f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };