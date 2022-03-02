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

export default function App() {
    return (
    <BrowserRouter>
        <Appbar/>
        <Routes>
            <Route path="/" element={<Navigate to="/home"/>}  />
            <Route path="/login" element={<Login />} />
            <Route path="/singup" element={<SingUp />} />
            <Route path="/home" element={<RequireAuth redirectTo="/login"> <Home /> </RequireAuth>} />
        </Routes>
        <Alert/>
    </BrowserRouter>
    );
}