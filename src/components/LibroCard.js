import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LibroSvg from "../libro.svg"
import Button from "@mui/material/Button";
import { useSelector,useDispatch } from 'react-redux'
import {setText} from '../features/alert/AlertSlice'
import {setStatus} from "../features/libros/LibroSlice"
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

export default function MediaControlCard(props) {
    let navigate = useNavigate();
    const dispatch = useDispatch()
    let path = "http://localhost:3001/libros/img/"+props.id

    const idLibro = useSelector((state) => state.libro.idLibro)
    // eslint-disable-next-line no-unused-vars
    const [upload,setUpload] = React.useState(props.Upload)
    const [imgLibroSelected, setimgLibroSelected] =React.useState();
    const [seleted,setSeleted] = React.useState(false)

    const handleSubmission = () => {
        const formData = new FormData();

        formData.append('ImgLibro', imgLibroSelected);

        fetch(
            'http://localhost:3001/libros/img/'+idLibro,
            {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization':'Bearer '+ localStorage.getItem('UTSbiblioteca')
                }
            }
        )
            .then((response) => response.json())
            .then((result) => {
                console.log('Success:', result);
                dispatch(setText({
                    msg:result.msg,
                    state:1
                }))
                dispatch(setStatus({
                    state:2
                }))
            })
            .catch((error) => {
                console.error('Error:', error);
                dispatch(setText({
                    msg:"Error al cargar la imgen",
                    state:2
                }))
            });
    };

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setimgLibroSelected(e.target.files[0]);
            setSeleted(true)
        }
    }

    return (

        <Card sx={{ display: 'flex' }} >
            <Box sx={{ display: 'flex', flexDirection: 'column', maxHeight:'md' }}>
                <Grid container spacing={2}>
                    <Grid item xs={9}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div">
                        <b>
                        <span style={{color:"#197cbb"}}>
                            {props.Titulo.toLocaleUpperCase()}
                        </span>
                        </b>
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                         <span style={{color:"#b20d4b"}}>
                        {props.Autor}
                         </span>
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                         <span style={{color:"#000000"}}>
                        {props.ISBN}
                         </span>
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                         <span style={{color:"#171717"}}>
                        {props.Editorial}
                         </span>
                    </Typography>
                </CardContent>
                        {!props.View && (
                            <Button fullWidth onClick={()=>{
                                navigate('/libro/view/'+props.id)
                            }}>
                                Ver libro

                            </Button>
                        )}

                    </Grid>
                    <Grid item xs={3} >
                        {props.id ? (
                            <img
                                width={100} height={160}
                                src={path}
                                alt="Live from space album cover"
                            />
                        ):(<>

                            {upload && (
                                <div>
                                    {!seleted && (
                                        <>
                                            <img
                                                width={100} height={100}
                                                style={{margin:"auto",display:'flex', justifyContent:'right'}}
                                                src={LibroSvg}
                                                alt="Live from space album cover"
                                            />
                                            <input
                                                accept="image/*"
                                                type="file"
                                                onChange={imageChange}
                                            />
                                        </>
                                    )}
                                    {seleted && (
                                        <>
                                            <img
                                                width={100} height={100}
                                                style={{ paddingTop:10, margin:"auto",display:'flex', justifyContent:'right'}}
                                                src={URL.createObjectURL(imgLibroSelected)}
                                                alt="Live from space album cover"
                                            />
                                            <Button onClick={()=>{handleSubmission()}} style={{marginTop:5, marginBottom:5}} fullWidth variant="contained">Confirmar</Button>
                                        </>
                                    )}



                                </div>
                            )}

                        </>)}
                    </Grid>
                </Grid>
            </Box>
        </Card>
    );
}