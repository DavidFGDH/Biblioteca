import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";


export default function BasicCard(props) {
    return (
        <Card sx={{ minWidth: 275 }} style={{marginTop:22}}>
            <CardContent>
                <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
                    Información Bibliográfica
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="body2">
                            <span style={{color:"#0c6acb"}}>AUTOR</span>
                            <br />
                            {props.Autor}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2">
                            <span style={{color:"#0c6acb"}}>EDICIÓN:</span>
                            <br />
                            {props.Edicion}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2">
                            <span style={{color:"#0c6acb"}}>PRINT ISBN:</span>
                            <br />
                            {props.PrintISBN}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2">
                            <span style={{color:"#0c6acb"}}>VOLUMEN:</span>
                            <br />
                            {props.Volumen}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2">
                            <span style={{color:"#0c6acb"}}>IDIOMA:</span>
                            <br />
                            {props.Idioma}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2">
                            <span style={{color:"#0c6acb"}}>EDITORIAL:</span>
                            <br />
                            {props.Editorial}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2">
                            <span style={{color:"#0c6acb"}}># DE PÁGINAS:</span>
                            <br />
                            {props.NumPaginas}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">
                            <span style={{color:"#0c6acb"}}>MATERIA:</span>
                            <br />
                            {props.Materia}
                        </Typography>
                    </Grid>
                </Grid>


            </CardContent>
        </Card>
    );
}