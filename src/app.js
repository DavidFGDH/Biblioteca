import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Login from "./views/login"
import SingUp from "./views/signup"
import Alert from "./components/alert"
import RequireAuth from "./auth/PrivateRoute";
import Home from "./views/Home"
import { Navigate } from 'react-router-dom';
import Appbar from "./components/Appbar"
import LibrosCrear from "./views/Libro"
import ViewLibraries from "./views/libroview"
import LibroEdit from "./views/editLibro"
export default function App() {
    const [token,SetToken] = React.useState(true)
    React.useEffect(()=>{
        SetToken(localStorage.getItem('UTSbiblioteca'))
    },[])
    return (
    <BrowserRouter>
        {token && (
            <Appbar/>
        )}
        <Routes>
            <Route path="/" element={<Navigate to="/home"/>}  />
            <Route path="/login" element={<Login />} />
            <Route path="/singup" element={<SingUp />} />
            <Route path="/home" element={<RequireAuth redirectTo="/login"> <Home /> </RequireAuth>} />
            <Route path="/libro/crear" element={<RequireAuth redirectTo="/login"> <LibrosCrear /> </RequireAuth>} />
            <Route path="/libro/view/:id" element={<RequireAuth redirectTo="/login"> <ViewLibraries /> </RequireAuth>} />
            <Route path="/libro/edit/:id" element={<RequireAuth redirectTo="/login"> <LibroEdit /> </RequireAuth>} />

        </Routes>
        <Alert/>
    </BrowserRouter>
    );
}