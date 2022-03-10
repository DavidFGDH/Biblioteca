import * as React from 'react';
import Container from '@mui/material/Container';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import DatosBasicos from "./form/DatosBasicos"
import {useSelector} from "react-redux";
import Button from "@mui/material/Button";
import {setData} from "../features/libros/LibroSlice"
import { useDispatch } from 'react-redux'
import {setText} from "../features/alert/AlertSlice";

export default function FixedContainer() {
    let navigate = useNavigate();

    const dispatch = useDispatch()
    const Titulo = useSelector((state) => state.libro.Titulo)
    const Autor = useSelector((state) => state.libro.Autor)
    const PrintISBN = useSelector((state) => state.libro.PrintISBN)
    const EISBN = useSelector((state) => state.libro.EISBN)
    const Editorial = useSelector((state) => state.libro.Editorial)
    const Edicion = useSelector((state) => state.libro.Edicion)
    const Volumen = useSelector((state) => state.libro.Volumen)
    const Idioma = useSelector((state) => state.libro.Idioma)
    const NumPaginas = useSelector((state) => state.libro.NumPaginas)
    const Materia = useSelector((state) => state.libro.Materia)


    let { id } = useParams();
    const [load,SetLoading] = React.useState(true)

    React.useEffect(()=>{
        const getLibroData = () =>{
            let config = {
                method: 'get',
                url: 'http://localhost:3001/libros/'+id,
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('UTSbiblioteca')
                }
            };

            axios(config)
                .then((response) => {
                    dispatch(setData({
                        Titulo: response.data.Titulo,
                        Autor: response.data.Autor,
                        PrintISBN:response.data.PrintISBN,
                        EISBN:response.data.EISBN,
                        Editorial:response.data.Editorial,
                       Edicion:response.data.Edicion,
                        Volumen:response.data.Volumen,
                        Idioma:response.data.Idioma,
                        NumPaginas:response.data.NumPaginas,
                        Materia:response.data.Materia,
                    }))
                    console.log(JSON.stringify(response.data));
                    SetLoading(false)
                })
                .catch((error) => {
                    console.log(error);
                });

        }
        getLibroData()
    },[])

    const UpdateLibro = () =>{
        let data = JSON.stringify({
            "Titulo":Titulo,
            "idLibro": id,
            "Autor": Autor,
            "PrintISBN": PrintISBN,
            "EISBN": EISBN,
            "Editorial": Editorial,
            "Edicion": Edicion,
            "Volumen":Volumen,
            "Idioma": Idioma,
            "NumPaginas": NumPaginas,
            "Materia": Materia
        });

        let config = {
            method: 'put',
            url: 'http://localhost:3001/libros/actualizar',
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('UTSbiblioteca'),
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                dispatch(setText({
                    msg:response.data.msg,
                    state:1
                }))
                navigate('/libro/view/'+id)
            })
            .catch((error) => {
                console.log(error);
            });

    }


    return (
        <Container fixed>
            {load ? (<h1>Cargando</h1>):(<>
                <DatosBasicos
                    Upload={true}
                    Titulo={Titulo}
                    Autor={Autor}
                    PrintISBN={PrintISBN}
                    EISBN={EISBN}
                    Editorial={Editorial}
                    Edicion={Edicion}
                    Volumen={Volumen}
                    Idioma={Idioma}
                    NumPaginas={NumPaginas}
                    Materia={Materia}
                />
                <Button style={{marginTop:22}} fullWidth variant="contained"
                onClick={()=>{
                    UpdateLibro()
                }}>Actualizar</Button>
            </>)}
        </Container>
    );
}