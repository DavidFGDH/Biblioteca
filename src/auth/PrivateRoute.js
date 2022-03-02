import React from 'react';
import { Navigate } from 'react-router-dom';

function RequireAuth({ children, redirectTo }) {
    let isAuthenticated = localStorage.getItem('UTSbiblioteca');
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
}
export default RequireAuth;