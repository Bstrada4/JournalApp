import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
    try {

        const result = await signInWithPopup(FirebaseAuth, googleProvider );
        const credentials = GoogleAuthProvider.credentialFromResult( result );
        const { displayName, email, photoURL, uid} = result.user;
        return {
            ok: true,
            displayName, email, photoURL, uid
        }
        
    } catch (error) {
        
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        }
    }
}

export const registerUserWithEmailPassword = async({ email, password, displayName }) => {
    try {
        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL } = resp.user;
        //TODO: actualizar el displayName en Firebase
        await updateProfile( FirebaseAuth.currentUser, { displayName } );
        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {
        console.log( error );
        return { ok: false, errorMessage: error.message }
    }
}

export const loginWithEmailPassword = async({ email, password}) => {
    try {

        // signWithEmailAndPassword
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL, displayName } = resp.user;

        return {
            ok: true,
            uid, email, displayName, photoURL
        }        
    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}

export const logoutFireBase = async() => {
    try {

        return await FirebaseAuth.signOut();
        
    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}

