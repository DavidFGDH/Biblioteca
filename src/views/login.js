import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { useDispatch } from 'react-redux'
import {setText} from '../features/alert/AlertSlice'
import { useNavigate } from 'react-router-dom';



function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                UTS Biblioteca
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignInSide() {
    let navigate = useNavigate();
    React.useEffect(()=>{
        if(localStorage.getItem('UTSbiblioteca')){
            navigate('/home')
        }
    })
    const dispatch = useDispatch()
    const [Correo,SetCorreo] = React.useState("")
    const [Password,SetPassword] =React.useState("")

    const Login = () => {
        let data = JSON.stringify({
            "Correo": Correo,
            "Password": Password
        });

        let config = {
            method: 'post',
            url: 'http://74.208.33.241:81/usuarios/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                localStorage.setItem('UTSbiblioteca',response.data.token)
                navigate('/home')
            })
            .catch((error) => {
                console.log(error.response.status);
                if(error.response.status===400){
                    dispatch(setText({
                        msg:'Verifica el formulario',
                        state:2
                    }))
                }else if(error.response.status === 404){
                    console.log(error.response.data)
                    dispatch(setText({
                        msg:error.response.data.msg,
                        state:2
                    }))
                }else{
                    dispatch(setText({
                        msg:"Datos incorrectos",
                        state:2
                    }))
                }
            });
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Typography style={{textAlign: 'center'}}>
                            Datos de inicio de sesion default
                        </Typography>
                        <Typography>
                            Correo:ejemplo@gmail.com
                        </Typography>
                        <Typography>
                            Password:Ejemplo.123
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={
                                (e)=>
                                {SetCorreo(e.target.value)}}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e)=>{SetPassword(e.target.value)}}

                            />
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={()=>{Login()}}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/singup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}