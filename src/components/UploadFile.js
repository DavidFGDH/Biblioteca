import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useSelector,useDispatch } from 'react-redux'
import {setText} from '../features/alert/AlertSlice'
import {setStatus} from "../features/libros/LibroSlice"
import Grid from "@mui/material/Grid";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import IconButton from "@mui/material/IconButton";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import moment from 'moment'
import Button from "@mui/material/Button";
export default function MediaControlCard() {
    moment.locale('es');
    const dispatch = useDispatch()
    const idLibro = useSelector((state) => state.libro.idLibro)
    const [imgLibroSelected, setimgLibroSelected] =React.useState();
    const [seleted,setSeleted] = React.useState(false)
    const [name,setName] = React.useState("")
    const [size,setSize] = React.useState("")
    const [date,setDate] = React.useState("")

    const handleSubmission = () => {
        const formData = new FormData();

        formData.append('Pdflibro', imgLibroSelected);

        fetch(
            'http://localhost:3001/libros/pdf/'+idLibro,
            {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization':'Bearer '+ localStorage.getItem('UTSbiblioteca')
                }
            }
        )
            .then((response) => {response.json()
                console.log(response)
                if(response.status === 500){
                    dispatch(setText({
                        msg:"Error al cargar la imgen",
                        state:2
                    }))
                    return;
                }else{
                    dispatch(setText({
                        msg:"Archivo cargado",
                        state:1
                    }))
                    dispatch(setStatus({
                        state:2
                    }))
                }

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            console.log()
            setName(e.target.files[0].name)
            setSize(e.target.files[0].size)
            setDate(e.target.files[0].lastModifiedDate)
            setimgLibroSelected(e.target.files[0]);
            setSeleted(true)
        }
    }

    return (
        <div style={{paddingTop:22}}>
            <Typography variant="h5" textAlign="center">
                Archivo PDF del Libro
            </Typography>
            <Card>
                <Grid container spacing={2} >
                    <Grid item xs={6} direction="row" alignItems="center">

                        <PictureAsPdfIcon style={{width:'50%', height:'100%', marginLeft:'20%'}}/>
                    </Grid>
                    <Grid item xs={6}>
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="contained-button-file"
                        />
                        <input accept="application/pdf" id="icon-button-file"
                               type="file" style={{ display: 'none' }}
                                onChange={(e)=>{imageChange(e)}}/>
                        <label htmlFor="icon-button-file">
                            <IconButton color="primary" aria-label="upload picture"
                                        component="span"
                                        style={{width:'50%', height:'100%', marginLeft:'20%'}}>
                                <FileUploadIcon style={{width:'50%', height:'100%'}} />
                            </IconButton>
                        </label>

                    </Grid>

                </Grid>
            </Card>
            {seleted && (
                <Grid container spacing={2} >
                <Grid item xs={12}>
                    <Typography>{name}</Typography>
                </Grid>
                    <Grid item xs={12}>
                        <Typography>{size/1000000} MB</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {
                            moment(date).format('MMMM Do YYYY, h:mm:ss a')
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained" onClick={()=>{
                            handleSubmission()
                        }}>
                        Enviar
                    </Button>
                    </Grid>
            </Grid>
            )}
        </div>
    );
}

