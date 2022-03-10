import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from "@mui/material/Container";
import { useSelector,useDispatch } from 'react-redux'
import {setStatus} from "../features/libros/LibroSlice"
import DatosBasicos from "./form/DatosBasicos"
import axios from "axios";
import {setText} from '../features/alert/AlertSlice'
import {setIdlibro} from "../features/libros/LibroSlice"
import LibroImg from "./form/LibroIMG"
import UploadFile from "../components/UploadFile"
const steps = ['Datos del Libro', 'Imagen del Libro', 'Archivo del Libro',];

export default function LibrosForm() {
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


    const dispatch = useDispatch()
    const status = useSelector((state) => state.libro.status)
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});

    React.useEffect(()=>{
        setCompleted({})
        setActiveStep(status)
    },[status])

    const CreateLibro = () => {
        let data = JSON.stringify({
            "Titulo": Titulo,
            "Autor": Autor,
            "PrintISBN": parseInt(PrintISBN),
            "EISBN": parseInt(EISBN),
            "Editorial": Editorial,
            "Edicion": Edicion,
            "Volumen": parseInt(Volumen),
            "Idioma": Idioma,
            "NumPaginas":parseInt(NumPaginas),
            "Materia": Materia
        });

        let config = {
            method: 'post',
            url: 'http://localhost:3001/libros/crear',
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('UTSbiblioteca'),
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                //
                dispatch(setText({
                    msg:response.data.msg,
                    state:1
                }))
                dispatch(setIdlibro({
                    idLibro:response.data.doc._id
                }))
                handleNext()
            })
            .catch((error) => {
                console.log(error.response)
                dispatch(setText({
                    msg:error.response.data.errors[0].msg,
                    state:2
                }))
                console.log(error);
            });


    }

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                  // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        dispatch(setStatus({
            state:newActiveStep
        }))
    };

    /**
    const handleBack = () => {
        dispatch(setStatus({
            state:activeStep-1
        }))
    };
**/
    const handleStep = (step) => () => {
        setActiveStep(step);
    };


    return (
        <Container fixed style={{marginTop:15}}>
        <Box sx={{ width: '100%' }}>
            <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                        <StepButton color="inherit" onClick={handleStep(index)}>
                            {label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === 0 && (
                    <DatosBasicos
                        Upload={false}
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
                )}
                {activeStep === 1 && (
                    <LibroImg
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
                )}
                {activeStep === 2 && (
                    <UploadFile/>
                )}
                {allStepsCompleted() ? (
                    <></>
                ) : (
                    <React.Fragment>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            {/**
                             <Button
                             color="inherit"
                             disabled={activeStep === 0}
                             onClick={handleBack}
                             sx={{ mr: 1 }}
                             >
                             Back
                             </Button>
                                **/

                            }

                            <Box sx={{ flex: '1 1 auto' }} />
                            {status === 0 && (
                                <Button variant="contained" fullWidth onClick={()=>{CreateLibro()}}>Siguiente</Button>
                            )}


                            {activeStep !== steps.length &&
                                (completed[activeStep] ? (
                                    <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                        Step {activeStep + 1} already completed
                                    </Typography>
                                ) : (
                                    <></>
                                ))}
                        </Box>
                    </React.Fragment>
                )}
            </div>
        </Box>
        </Container>

    );
}