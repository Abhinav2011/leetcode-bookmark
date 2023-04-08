import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signOut,
} from "firebase/auth";

import {
    getFirestore,
    query,
    doc,
    getDocs,
    collection,
    where,
    addDoc,
    setDoc
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDQabAosDpiTA3xY_S9vOgsacGjvW58zNQ",
    authDomain: "leetcode-bookmark.firebaseapp.com",
    projectId: "leetcode-bookmark",
    storageBucket: "leetcode-bookmark.appspot.com",
    messagingSenderId: "308916395054",
    appId: "1:308916395054:web:c58df6c85b13bfd20e53bf",
    measurementId: "G-B804JDKRZM",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


//sign in using google account
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        console.log(docs);
        if (docs.docs.length === 0) {
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
                photoURL: user.photoURL,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};


//logout from the website
const logout = () => {
    signOut(auth);
};

export {
    auth,
    db,
    signInWithGoogle,
    logout,
  }
