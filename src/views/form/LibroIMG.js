import React from 'react';
import LibroCard from "../../components/LibroCard"
import Container from "@mui/material/Container";
import LibroDataDisplay from "../../components/LibroDataDisplay"
export default function UploadImg(props){
    console.log(props.Upload)
    return(
        <Container maxWidth="md" style={{paddingTop:22}}>
            <LibroCard
                View={true}
                Upload={props.Upload}
                Autor={props.Autor}
                Titulo={props.Titulo}
                ISBN={props.PrintISBN}
                Editorial={props.Editorial}
                />
            <LibroDataDisplay
                Autor={props.Autor}
                Materia={props.Materia}
                Edicion={props.Edicion}
                PrintISBN={props.PrintISBN}
                Volumen={props.Volumen}
                Idioma={props.Idioma}
                Editorial={props.Editorial}
                NumPaginas={props.NumPaginas}/>
        </Container>
    );
}