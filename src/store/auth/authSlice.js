import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated', // 'not-authenticated', 'auhenticated'
        uid: null,
        email: null,
        password: null,
        prueba: null,
        displayName: null,
        photoURL: null,
        erroMessage: null,
    },
    reducers: {
        login: ( state, action ) => {

        },
        logout: ( state, payload) => {

        },
        checkingCredentials: ( state ) => {
            state.status = 'checking';
        }
    },
});
export const { login, logout, checkingCredentials } = authSlice.actions;