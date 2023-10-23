// THUNKS SON LAS TAREAS ASINCRONAS

import { registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = ( email, password ) => {
    return async( dispatch ) => {
        // DISPATCH CHECKING CREDENTIALS
        dispatch( checkingCredentials() );
    }
}

export const startGoogleSignIn = ( email, password ) => {
    return async( dispatch ) => {
        // DISPATCH CHECKING CREDENTIALS
        dispatch( checkingCredentials() );

        const result = await signInWithGoogle();

        if ( !result.ok ) return dispatch ( logout( result.errorMessage ) );

        delete result.ok;
        dispatch( login( result ) );

    }
}

export const startCreateUserWithEmailPassword = ({ email, password, displayName }) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });

        if( !ok ) return dispatch( logout({ errorMessage }) );

        dispatch( login({ uid, displayName, email, photoURL }) );

    }
}