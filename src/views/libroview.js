import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import {useParams} from "react-router-dom";
import axios from "axios";
import LibroDataDisplay from "../components/LibroDataDisplay"
import LibroCard from "../components/LibroCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from "@mui/material/Button";
import { Document,Page } from 'react-pdf/dist/esm/entry.webpack';
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {setText} from '../features/alert/AlertSlice'
import {useDispatch} from "react-redux";


export default function FixedContainer() {
    const dispatch = useDispatch()
    let navigate = useNavigate();
    let { id } = useParams();

    const [load,setLoad]= React.useState(true)
    const [Libro,SetLibro] = React.useState()
    const [numPages, setNumPages] =React.useState(null);
    const [pageNumber, setPageNumber] = React.useState(1);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const Eliminar = () =>{
        let data = JSON.stringify({
            "idLibro": id
        });

        let config = {
            method: 'delete',
            url: 'http://74.208.33.241:81/libros/libro',
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('UTSbiblioteca'),
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
            .then((response) => {
                dispatch(setText({
                    msg:response.data.msg,
                    state:1
                }))
                setOpen(false)
                navigate('/home')
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });

    }


    React.useEffect(()=>{
        const getLibroData =()=>{
            let config = {
                method: 'get',
                url: 'http://74.208.33.241:81/libros/'+id,
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('UTSbiblioteca')
                }
            };

            axios(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    SetLibro(response.data)
                    setLoad(false)
                })
                .catch((error) => {
                    console.log(error);
                });

        }
        getLibroData()
    },[])

    return (
        <React.Fragment>
            <CssBaseline />
            <Container fixed>
                {load ? (
                 <>
                     Cargando...
                 </>
                ):(<>
                <Grid container >
                    <Grid item xs={8}>
                        <LibroCard
                            View={true}
                            Autor={Libro.Autor}
                            Titulo={Libro.Titulo}
                            ISBN={Libro.PrintISBN}
                            Editorial={Libro.Editorial}
                            Materia={Libro.Materia}
                            id={Libro._id}/>
                    </Grid>
                        <Grid item xs={2}>
                            <Box sx={{ bgcolor: '#04c7d9', height: '80%', maxHeight:170 }}>
                                <EditIcon style={ {color: 'white', width: '100%', height: '70%'}}/>
                                <Button fullWidth style={{color: 'white'}}
                                onClick={()=>{
                                    navigate('/libro/edit/'+id)
                                }}
                                >Editar</Button>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box sx={{ bgcolor: '#cb2424', height: '80%',maxHeight:170 }} >
                                <DeleteForeverIcon  style={{color: 'white',width: '100%', height: '70%'}}/>
                                <Button fullWidth style={{color: 'white'}}
                                onClick={()=>{
                                    handleClickOpen()
                                }}>Eliminar</Button>

                            </Box>
                        </Grid>

                    <Grid item xs={12} style={{paddingBottom: 22}}>
                        <LibroDataDisplay
                            Autor={Libro.Autor}
                            Materia={Libro.Materia}
                            Edicion={Libro.Edicion}
                            PrintISBN={Libro.PrintISBN}
                            Volumen={Libro.Volumen}
                            Idioma={Libro.Idioma}
                            Editorial={Libro.Editorial}
                            NumPaginas={Libro.NumPaginas}/>
                    </Grid>

                    <Grid item xs={12}>
                        <Box display="flex" flexDirection="column" >
                        <Document file={"http://74.208.33.241:81/libros/pdf/"+id} onLoadSuccess={onDocumentLoadSuccess}>
                                <Page
                                    pageNumber={pageNumber} />
                            </Document>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth
                                variant="contained"
                        onClick={()=>{
                            setPageNumber(pageNumber-1)
                        }}
                        > {'<'} </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" fullWidth
                                onClick={()=>{
                                    setPageNumber(pageNumber+1)
                                }}
                        > {'>'} </Button>
                    </Grid>
                </Grid>
                </>)}
                <div>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Eliminacion de libro"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                ¿Deseas eliminar este libro de forma permanente?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Disagree</Button>
                            <Button onClick={()=>{Eliminar()}} autoFocus>
                                Agree
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Container>

        </React.Fragment>
    );
}