import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // 'not-authenticated', 'auhenticated'
        uid: null,
        email: null,
        password: null,
        displayName: null,
        photoURL: null,
        errorMessage: null,
    },
    reducers: {
        login: ( state, { payload } ) => {
            state.status = 'authenticated', // 'not-authenticated', 'auhenticated'
            state.uid = payload.uid;
            state.email = payload.email;
            state.password = payload.password;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.errorMessage = payload.errorMessage;
        },
        logout: ( state, { payload }) => {
            state.status = 'not-authenticated', // 'not-authenticated', 'auhenticated'
            state.uid = null;
            state.email = null;
            state.password = null;
            state.prueba = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = payload?.errorMessage;
        },
        checkingCredentials: ( state ) => {
            state.status = 'checking';
        }
    },
});
export const { login, logout, checkingCredentials } = authSlice.actions;