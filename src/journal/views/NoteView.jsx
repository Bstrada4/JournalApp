import { Padding, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components/ImageGallery"
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { useEffect, useMemo, useRef } from "react";
import { setActiveNote } from "../../store/journal/journalSlice";
import { startSaveNotes, startUploadingFiles } from "../../store/journal/thunks";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';

export const NoteView = () => {

    const dispatch = useDispatch();

    const { active:note, messageSave, isSaving } = useSelector( state => state.journal );

    const { body, title, date, onInputChange, formState } = useForm( note );

    const dateString = useMemo(() => {
        const newDate = new Date( date );
        return newDate.toUTCString();
    }, [ date ]);

    const fileInputRef = useRef();

    useEffect(() => {
      dispatch( setActiveNote( formState ) );
    }, [ formState ]);

    useEffect(() => {
        if( messageSave.length > 0) {
            Swal.fire('Nota actualizada', messageSave, 'success');
        }
      
    }, [ messageSave ]);
    

    const onSaveNote = () => {
        dispatch( startSaveNotes() );
    }

    const onFileInputChange = ({ target }) => {
        if ( target.files === 0)  return;
        dispatch( startUploadingFiles( target.files ) );
        //console.log( 'Subiendo Archivos' );
    }

    return (
        <Grid container direction='row' justifyContent='space-between' alignItems="center" sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={ 39 } fontWeight='lig'>{ dateString }</Typography>
            </Grid>

            <input
                type="file"
                multiple
                ref={ fileInputRef }
                onChange={ onFileInputChange }
                style={{ display: 'none' }}
            />

            <IconButton
                color="primary"
                disabled={ isSaving }
                onClick={ () => fileInputRef.current.click() }
            >
                <UploadOutlined />
            </IconButton>

            <Grid item>
                <Button
                    disabled={ isSaving }
                    color="primary"
                    sx={{ padding: 2 }}
                    onClick={ onSaveNote }
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un título"
                    label="Título"
                    name="title"
                    value={ title }
                    onChange={ onInputChange }
                    sx={{ border: 'none', mb: 1 }}
                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    name="body"
                    value={ body }
                    onChange={ onInputChange }
                    placeholder="¿Qué sucedió en el día de hoy?"
                    minRows={ 5 }
                />
            </Grid>

            <ImageGallery />

        </Grid>
    )
}
