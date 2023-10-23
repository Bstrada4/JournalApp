import { Link as RouterLink } from 'react-router-dom';  
import { Google } from "@mui/icons-material";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { checkingAuthentication, startGoogleSignIn } from '../../store/auth';
import { useMemo } from 'react';

export const LoginPage = () => {

    const { status } = useSelector( state => state.auth);

    const dispatch = useDispatch();

    const { email, password, onInputChange } = useForm({
        email: 'bstrada4@gmail.com',
        password: '123456',
    });
    
    const isAuthenticating = useMemo( () => status === 'checking', [ status ] );    

    const onSubmit = ( event ) => {
        event.preventDefault();        
        dispatch( checkingAuthentication() );
    }

    const onGoogleSignIn = () => {
        dispatch( startGoogleSignIn() );
    }

    return (
        <>
            <AuthLayout title="Login">

                <form onSubmit={ onSubmit }>
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
                            /> 
                        </Grid>
                    </Grid>

                    <Grid container spacing={ 2 } sx={{ mb: 2 }}>
                        <Grid item xs={ 12 } sm={ 6 } sx={{ mt: 2 }}>
                            <Button
                                disabled={ isAuthenticating }
                                type="submit"
                                variant="contained"
                                fullWidth
                            >
                                Login
                            </Button>
                        </Grid>

                        <Grid item xs={ 12 } sm={ 6 } sx={{ mt: 2 }}>
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
