import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdHVbVggFgX9R__Hhjb2-h2ZCoKFaoOdM",
  authDomain: "samplepicuploader.firebaseapp.com",
  projectId: "samplepicuploader",
  storageBucket: "samplepicuploader.appspot.com",
  messagingSenderId: "710980577193",
  appId: "1:710980577193:web:589cdee348fa9e055a46b8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
const db = getFirestore(app);

export { auth, provider, storage, db };
