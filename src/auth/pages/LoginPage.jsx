import { Link as RouterLink } from 'react-router-dom';  
import { Google } from "@mui/icons-material";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';
import { useMemo, useState } from 'react';

const formData = {
    email: '',
    password: '',
    displayName: '',
};

const formValidation = {
    email: [ (value) => value.includes('@'), 'El correo debe tener un @'],
    password: [ (value) => value.length >= 6, 'La contraseña debe debe de tener más de 6 caractéres'],
}

export const LoginPage = () => {

    const { status, errorMessage } = useSelector( state => state.auth);

    const dispatch = useDispatch();
    const [ formSubmitted, setFormsubmitted ] = useState( false );

    const { formState, email, password, onInputChange, isFormValid, emailValid, passwordValid } = useForm( formData, formValidation );
 
    const isAuthenticating = useMemo( () => status === 'checking', [ status ] );  
      

    const onSubmit = ( event ) => {
        event.preventDefault();
        
        setFormsubmitted( true );
        dispatch( startLoginWithEmailPassword( { email, password } ) );
    }

    const onGoogleSignIn = () => {
        dispatch( startGoogleSignIn() );
    }

    return (
        <>
            <AuthLayout title="Login">

                <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
                    <Grid container>
                        <Grid item xs={ 12 } sx={{ mt: 2 }}>
                                <TextField
                                    label="Correo"
                                    type="email"
                                    placeholder="correo@gmail.com"
                                    fullWidth
                                    value={ email }
                                    name="email"
                                    onChange={ onInputChange }
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
                                fullWidth
                                onChange={ onInputChange }
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

                        <Grid item xs={ 12 } sm={ 6 } sx={{ mt: 1 }}>
                            <Button
                                disabled={ isAuthenticating }
                                type="submit"
                                variant="contained"
                                fullWidth
                            >
                                Login
                            </Button>
                        </Grid>

                        <Grid item xs={ 12 } sm={ 6 } sx={{ mt: 1 }}>
                            <Button
                                disabled={ isAuthenticating }
                                variant="contained"
                                fullWidth
                                onClick={ onGoogleSignIn }
                            >
                                <Google />
                                <Typography sx={{ ml: 1 }}> Google </Typography>
                            </Button>
                        </Grid>

                        <Grid container direction="row" justifyContent="end">

                            <Link component={ RouterLink } color="inherit" to="/auth/register" sm={ 12 } sx={{ mt: 2 }}>
                                Crear una cuenta
                            </Link>
                        </Grid>
                    </Grid>

                </form>

            </AuthLayout>

        </>
    )
}
