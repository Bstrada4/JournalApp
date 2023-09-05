import { Link as RouterLink } from 'react-router-dom';  
import { Google } from "@mui/icons-material";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from '../layout/AuthLayout';

export const RegisterPage = () => {
    return (
        <>
            <AuthLayout title="Crear Cuenta">

                <form>
                    <Grid container>
                        <Grid item xs={ 12 }>
                            <TextField label="Nombre Completo" type="text" placeholder="Boris Estrada" fullWidth/>
                        </Grid>

                        <Grid item xs={ 12 }  sx={{ mt: 2 }}>
                            <TextField label="Correo" type="email" placeholder="correo@gmail.com" fullWidth/>
                        </Grid>

                        <Grid item xs={ 12 } sx={{ mt: 2 }}>
                            <TextField label="Contraseña" type="password" placeholder="contraseña" fullWidth/>
                        </Grid>
                    </Grid>

                    <Grid container spacing={ 2 } sx={{ mb: 2 }}>
                        <Grid item xs={ 12 } sm={ 12 } sx={{ mt: 2 }}>
                            <Button variant="contained" fullWidth>
                                Crear Cuenta
                            </Button>
                        </Grid>

                        <Grid container direction="row" justifyContent="end">
                            <Typography sx={{ mt: 2 }}> ¿Ya tienes una cuenta? </Typography>
                        </Grid>
                    </Grid>

                </form>

            </AuthLayout>

        </>
    )
}
