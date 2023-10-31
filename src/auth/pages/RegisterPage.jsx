import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreateUserWithEmailPassword } from '../../store/auth/thunks';

const formData = {
    email: 'bestradasan@gmail.com',
    password: '123456',
    displayName: 'Boris Estrada',
};

const formValidation = {
    email: [ (value) => value.includes('@'), 'El correo debe tener un @'],
    password: [ (value) => value.length >= 6, 'La contraseña debe debe de tener más de 6 caractéres'],
    displayName: [ (value) => value.length > 1, 'El nombre es obligatorio'],
}

export const RegisterPage = () => {

    const dispatch = useDispatch();

    const [ formSubmitted, setFormsubmitted ] = useState( false );

    const { status, errorMessage } = useSelector( state => state.auth );
    const isCheckingAuthentication = useMemo( () => status === 'checking', [ status ] );

    const {
        formState, displayName, email, password, onInputChange,
        isFormValid, displayNameValid, emailValid, passwordValid
    } = useForm( formData, formValidation );

    const onSubmit = ( event ) => {
        event.preventDefault();
        setFormsubmitted( true );

        if ( !isFormValid ) return;

        dispatch( startCreateUserWithEmailPassword( formState ) );
    }    

    return (
        <>
            <AuthLayout title="Crear Cuenta">

                <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
                    <Grid container>
                        <Grid item xs={ 12 }>
                            <TextField 
                                label="Nombre Completo"
                                type="text"
                                placeholder="Boris Estrada"
                                name="displayName"
                                value={ displayName }
                                onChange={ onInputChange }
                                fullWidth
                                error={ !!displayNameValid && formSubmitted }
                                helperText={ displayNameValid }
                            />
                        </Grid>

                        <Grid item xs={ 12 }  sx={{ mt: 2 }}>
                            <TextField
                                label="Correo"
                                type="email"
                                placeholder="correo@gmail.com"
                                name="email"
                                value={ email }
                                onChange={ onInputChange }
                                fullWidth
                                error={ !!emailValid && formSubmitted }
                                helperText={ emailValid }
                            />
                        </Grid>

                        <Grid item xs={ 12 } sx={{ mt: 2 }}>
                            <TextField
                                label="Contraseña"
                                type="password"
                                placeholder="contraseña"
                                name="password"
                                value={ password }
                                onChange={ onInputChange }
                                fullWidth
                                error={ !!passwordValid && formSubmitted }
                                helperText={ passwordValid }
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={ 2 } sx={{ mb: 2 }}>
                        <Grid
                            item xs={ 12 }
                            sm={ 12 }
                            sx={{ mt: 2 }}
                            display={ !!errorMessage ? '' : 'none'}
                        >
                            <Alert severity='error'> { errorMessage } </Alert>
                        </Grid>

                        <Grid item xs={ 12 } sm={ 12 } sx={{ mt: 2 }}>
                            <Button
                                disabled={ isCheckingAuthentication }
                                type="submit"
                                variant="contained"
                                fullWidth
                            >
                                Crear Cuenta
                            </Button>
                        </Grid>

                        <Grid container direction="row" justifyContent="end" sx={{ mt: 1 }}>
                            <Typography sx={{ mr: 1 }}> ¿Ya tienes una cuenta?</Typography>
                            <Link component={ RouterLink } color='inherit' to="/auth/login">
                                Ingresar
                            </Link>
                            
                        </Grid>
                    </Grid>

                </form>

            </AuthLayout>

        </>
    )
}
