// THUNKS SON LAS TAREAS ASINCRONAS

import { checkingCredentials } from "./authSlice";

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
    }
}