import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

import firebaseConfig from "../common/firebaseConfig.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {
    let user = null;
    try {
        user = (await signInWithPopup(auth, provider)).user;
    } catch (error) {
        throw error;
    }
    return user;
}