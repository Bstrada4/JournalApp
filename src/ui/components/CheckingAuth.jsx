import { CircularProgress, Container, Grid } from "@mui/material";

export const CheckingAuth = () => {
    return (
        <>
             <Grid
                container
                spacing={ 0 }
                direction="column"
                alignContent="center"
                justifyContent="center"
                sx={{ 
                    minHeight: '100vh',
                    backgroundColor:
                    'primary.main',
                    padding: 4,
                }}
            >
                <Container direction="row" sx={ { textAlign: "center" } }>
                    <CircularProgress color="warning" />
                </Container>
                
            </Grid>

        </>
    )
}
