import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import {
    setTitulo,
    setAutor,
    setPrintISBN,
    setEISBN,
    setEditorial,
    setEdicion,
    setVolumen,
    setIdioma,
    setNumPaginas,
    setMateria
} from '../../features/libros/LibroSlice'
import {useDispatch} from 'react-redux'

export default function AddressForm(props) {
    const dispatch = useDispatch()
    return (
        <div style={{paddingTop:15}}>
            <Grid container spacing={3}>
                <Grid item xs={12} >
                    <TextField
                        required
                        value={props.Titulo}
                        id="Titulo"
                        name="Titulo"
                        label="Titulo"
                        fullWidth
                        autoComplete="Titulo"
                        variant="standard"
                        onChange={(e)=>{
                            dispatch(setTitulo({
                                Titulo:e.target.value
                            }))
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        value={props.Autor}
                        id="Autor"
                        name="Autor"
                        label="Autor"
                        fullWidth
                        autoComplete="Autor"
                        variant="standard"
                        onChange={(e)=>{
                            dispatch(setAutor({
                                Autor:e.target.value
                            }))
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        value={props.PrintISBN}
                        id="PrintISBN"
                        name="PrintISBN"
                        label="Print ISBN"
                        fullWidth
                        variant="standard"
                        onChange={(e)=>{
                            dispatch(setPrintISBN({
                                PrintISBN:e.target.value
                            }))
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        value={props.EISBN}
                        id="EISBN"
                        name="EISBN"
                        label="E-ISBN"
                        fullWidth
                        variant="standard"
                        onChange={(e)=>{
                            dispatch(setEISBN({
                                EISBN:e.target.value
                            }))
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        value={props.Editorial}
                        id="Editorial"
                        name="Editorial"
                        label="Editorial"
                        fullWidth
                        variant="standard"
                        onChange={(e)=>{
                            dispatch(setEditorial({
                                Editorial:e.target.value
                            }))
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        value={props.Edicion}
                        id="Edicion"
                        name="Edicion"
                        label="Edicion"
                        fullWidth
                        variant="standard"
                        onChange={(e)=>{
                            dispatch(setEdicion({
                                Edicion:e.target.value
                            }))
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        value={props.Volumen}
                        id="Volumen"
                        name="Volumen"
                        label="Volumen"
                        fullWidth
                        variant="standard"
                        onChange={(e)=>{
                            dispatch(setVolumen({
                                Volumen:e.target.value
                            }))
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        value={props.Idioma}
                        id="Idioma"
                        name="Idioma"
                        label="Idioma"
                        fullWidth
                        variant="standard"
                        onChange={(e)=>{
                            dispatch(setIdioma({
                                Idioma:e.target.value
                            }))
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        value={props.NumPaginas}
                        id="NumPaginas"
                        name="NumPaginas"
                        label="Numero de Paginas"
                        fullWidth
                        variant="standard"
                        onChange={(e)=>{
                            dispatch(setNumPaginas({
                                NumPaginas:e.target.value
                            }))
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        value={props.Materia}
                        id="Materia"
                        name="Materia"
                        label="Materia"
                        fullWidth
                        variant="standard"
                        onChange={(e)=>{
                            dispatch(setMateria({
                                Materia:e.target.value
                            }))
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    );
}