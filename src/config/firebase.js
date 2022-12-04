// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsfoeic-QFMjvsDyzsdWmElV9ouaYH0b4",
  authDomain: "nested-comments-7d7db.firebaseapp.com",
  projectId: "nested-comments-7d7db",
  storageBucket: "nested-comments-7d7db.appspot.com",
  messagingSenderId: "94151471260",
  appId: "1:94151471260:web:fba6ece3fb05f02503fd59"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    db
}