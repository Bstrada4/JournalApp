import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, updatedNote } from './journalSlice';
import { loadNotes } from '../../helpers';

export const startNewNote = () => {
    return async( dispatch, getState ) => {

        dispatch( savingNewNote() );

        const { uid } = getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) );
        const setDocRes = await setDoc( newDoc, newNote);

        newNote.id = newDoc.id;
       
        dispatch( addNewEmptyNote( newNote ) );
        
        dispatch( setActiveNote( newNote ) );

    }
}

export const startLoadingNotes = ( uid = '' ) => {
    return async( dispatch, getState ) => {
        const { uid } = getState().auth;
        if ( !uid ) throw new Error('El UID del usuario no existe');
        const notes = await loadNotes( uid );

        dispatch( setNotes( notes ) );
    }
}

export const startSaveNotes = () => {
    return async( dispatch, getState ) => {

        dispatch( setSaving() );
        
        const { uid } = getState().auth;
        const { active:activeNote } = getState().journal;

        const noteToFireStore = { ...activeNote };
        delete noteToFireStore.id;

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ activeNote.id }`);
        await setDoc( docRef, noteToFireStore,{ merge: true } );

        dispatch( updatedNote( activeNote ) );

    }
}

export const startUploadingFiles = ( files = [] ) => {
    return async( dispatch, getState ) => {

        dispatch( setSaving() );
        
        console.log( files );
        //dispatch( updatedNote( activeNote ) );

    }
}

