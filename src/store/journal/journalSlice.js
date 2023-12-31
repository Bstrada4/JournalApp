import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSave: '',
        notes: [],
        active: null
    },
    reducers: {
        savingNewNote: ( state ) => {
            state.isSaving = true;
        },
        addNewEmptyNote: ( state, action ) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },
        setActiveNote: ( state, action ) => {
            state.active = action.payload;
            state.messageSave = '';
        },
        setNotes: ( state, action ) => {
            state.notes = action.payload;
        },
        setSaving: ( state ) => {
            state.isSaving = true;
            state.messageSave = '';
            //TODO mensaje de error...
        },
        updatedNote: ( state, action ) => {
            state.isSaving = false;
            state.notes = state.notes.map( note => {
                if( note.id === action.payload.id ){
                    return action.payload;
                }
                return note;
            });

            state.messageSave = `${action.payload.title}, se actualizó correctamente`;
        },
        deleteNoteById: ( state, action ) => {

        }
    },
});
export const {
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updatedNote,
    deleteNoteById,
} = journalSlice.actions;