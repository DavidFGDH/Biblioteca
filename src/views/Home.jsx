import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LibroCard from "../components/LibroCard"
import Container from "@mui/material/Container";
import axios from "axios";
import Typography from "@mui/material/Typography";
let libros = []

export default function ResponsiveGrid() {
    const [loading,Setloading]=React.useState(true)

    React.useEffect(()=>{
        libros = []
        const getLibros = () =>{
            let config = {
                method: 'get',
                url: 'http://localhost:3001/libros/todos',
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('UTSbiblioteca')
                }
            };
            axios(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    for(let i in response.data){
                        libros.push(response.data[i])
                    }
                    Setloading(false)
                })
                .catch((error) => {
                    console.log(error);
                });

        }
        getLibros()
    },[])
    
    return (
        <Container maxWidth="lg">
            {loading && (
                <Typography>
                    Cargando
                </Typography>
            )}

            {!loading && (
                <Box sx={{ flexGrow: 1 }} style={{paddingTop: 25}}>
                    <Grid container spacing={2}>
                        {libros.map((lib)=>(
                            <Grid item xs={12} sm={6} key={lib._id}>
                                <LibroCard
                                    Autor={lib.Autor}
                                    Titulo={lib.Titulo}
                                    ISBN={lib.PrintISBN}
                                    Editorial={lib.Editorial}
                                    Materia={lib.Materia}
                                    id={lib._id}/>
                             </Grid>
                        ))}
                    </Grid>
                </Box>
            )}

        </Container>
    );
}